require("dotenv").config();
import express from "express";
import http from "http";
import cors from "cors";
const socketio = require("socket.io");

import router from "./router";

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
    console.log("A new web socket connection.");

    socket.on('disconnect', () => {
        console.log("User has left.");
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})