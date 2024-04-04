import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connectDB.js";
import authRoutes from "./routes/authroute.js"
import messageRoutes from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import { app,server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.get("/",(req,res) => {
    res.send("Hello WOrld");
});

server.listen(PORT, () => {
    connectToDB();
    console.log(`Listening on ${PORT}`);
});