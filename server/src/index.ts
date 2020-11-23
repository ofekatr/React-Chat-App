require("dotenv").config();
import express from "express";
import http from "http";
import cors from "cors";
const socketio = require("socket.io");

import router from "./router";

const app = express();
app.use(cors());
app.use('/', router);

const server = http.createServer(app);
const io = socketio(server);

const { PORT } = process.env;
const port = PORT || 8080;

io.on('connection', (socket) => {
    console.log("A new web socket connection.");

    socket.on('disconnect', () => {
        console.log("User has left.");
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})