import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap ={};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId !== "undefined") userSocketMap[userId] = socket.id;
    console.log(userId);

    // Emit the updated list of online users whenever a new user connects or disconnects
    io.emit("getonlineuser", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        // Emit the updated list of online users after a user disconnects
        io.emit("getonlineuser", Object.keys(userSocketMap));
    });
});


export {app,io,server};