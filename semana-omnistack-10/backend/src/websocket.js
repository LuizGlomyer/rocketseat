const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        console.log("Device: " + socket.id);
        if(!socket.handshake.query) return; 

        let { latitude, longitude, techs } = socket.handshake.query;
        console.log(latitude, longitude, techs);
        
        setTimeout(() => {
            socket.emit('message', 'Hello World');
        }, 3000);

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        });
    });
}

exports.findConnections = (coordinates, techs) => {
    if(!coordinates) return;
    return connections.filter(connection => {
        return calculateDistance(coordinates, connections.coordinates) < 10
        && connection.techs.some(item => techs.includes(item));
    });
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
};