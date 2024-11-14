"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketServer = initializeSocketServer;
const socket_io_1 = require("socket.io");
function initializeSocketServer(httpServer) {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
        // Join a room
        socket.on('join', (room) => {
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
        });
        // Leave a room
        socket.on('leave', (room) => {
            socket.leave(room);
            console.log(`Socket ${socket.id} left room ${room}`);
        });
        // Broadcast to a room
        socket.on('message-to-room', (room, message) => {
            io.to(room).emit('room-message', message); // Emit message to specific room
        });
        // Broadcast to all except sender
        socket.on('broadcast', (message) => {
            socket.broadcast.emit('broadcast-message', message); // Emit message to all except sender
            console.log(`Broadcast message sent:`, message);
        });
        socket.on('update-missiles', (newCount) => {
            io.to('room1').emit('update-missiles', newCount);
        });
        // Acknowledgement example
        socket.on('request', (data, callback) => {
            console.log('Request received', data);
            callback({ status: 'OK' }); // Acknowledge the request
        });
        // Volatile event example (heartbeat)
        setInterval(() => {
            socket.volatile.emit('heartbeat', { time: new Date().toISOString() }); // Emit heartbeat every second
        }, 1000);
        socket.on('disconnect', (reason) => {
            console.log('A user disconnected', socket.id, 'reason:', reason);
        });
        socket.on('buttonClicked', (data) => {
            io.emit('buttonClicked', data);
            console.log(`Button clicked with name: ${data.name}`);
        });
    });
    return io;
}
//# sourceMappingURL=socketServer.js.map