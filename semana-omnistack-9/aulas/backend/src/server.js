const express = require("express");
const fs = require('fs');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require("./routes");

const app = express();
const server = http.Server(app); // extraindo o servidor http do express
//const io = socketio(server); 
const io = require("socket.io")(server, {
    cors: {
      origin: "https://example.com",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

// chave gerada no MongoDB Atlas
var key = fs.readFileSync('key.txt', 'utf-8');
mongoose.connect(key, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected'))
    .catch(() => console.log('Not Connected'))

//req.query = acessar query params enviados (para filtros)
//req.params = acessar params enviados pela rota (para edição e delete)
//req.body = acessar corpo da requisição

const connectedUsers = { };

io.on('connection', socket => {  // monitora todo usuário logado na aplicação
    console.log('Usuário conectado', socket.id); // socket de cada usuário
    console.log(socket.handshake.query);

    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;

    
    /*
    socket.on('omni', data => {
        console.log(data);
    });
    
    setTimeout(() => {
        socket.emit('hello', 'world');
    }
    , 4000 );*/
});

app.use((req, res, next) => {
    req.io = io; // tornando a requisição disponível a todas as outras rotas
    req.connectedUsers = connectedUsers;

    return next(); // continua o fluxo da aplicação
});



app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); // criação da rota para retornar as imagens
app.use(routes);


server.listen(3333); // localhost:3333
