const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

// chave gerada no MongoDB Atlas
var key = fs.readFileSync('key.txt', 'utf-8'); 
mongoose.connect(key, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected'))
    .catch(() => console.log('Not Connected'))


const app = express();
const server = http.Server(app);

setupWebSocket(server);

app.use(cors());
app.use(express.json()); // configurando o express para aceitar json no corpo da requisição
app.use(routes);
const port_number = 3333;


 
 
server.listen(port_number);