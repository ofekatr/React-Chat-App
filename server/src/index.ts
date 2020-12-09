require("dotenv").config();
import express from "express";
import http from "http";
import cors from "cors";
const socketio = require("socket.io");

import router from "./router";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users";

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use('/', router);

const { PORT } = process.env;
const port = PORT || 8080;

io.on('connect', (socket) => {
    socket.on('join', ({ username, room }, callback) => {
        const { newUser, error } = addUser({ id: socket.id, username, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${newUser!.username}, welcome to the room ${room}.` })
        socket.broadcast.to(room).emit('message', { user: 'admin', text: `${newUser!.username} has joined the room.` })
        socket.join(room);

        io.to(newUser?.room).emit("roomData", { room: newUser?.room, users: getUsersInRoom(newUser?.room) })

        return callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const { user, error } = getUser(socket.id);

        if (error) return callback(error);

        const { username, room } = user!;
        io.to(room).emit('message', { user: username, text: message });
        io.to(user?.room).emit("roomData", { room: user?.room, users: getUsersInRoom(user?.room) })

        return callback();


    });

    socket.on('disconnect', () => {
        const { user } = removeUser(socket.id);
        user && io.to(user.room).emit("message", { user: "admin", text: `${user.username} has left the chat.` });
        user && io.to(user?.room).emit("roomData", { room: user?.room, users: getUsersInRoom(user?.room) })
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})