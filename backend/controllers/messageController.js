import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants : {$all : [recieverId,senderId]}
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,recieverId]
            });
        }
        const newMessage = new Message({
            senderId:senderId,
            recieverId:recieverId,
            message:message
        });
        await newMessage.save();
        if(newMessage){
            conversation.messages.push(newMessage);
        }
        await conversation.save();
        
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error:"Internal error"});
    }
};

export const getMessage = async (req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");
        if(!conversation) return res.status(200).json([]);
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error:"Internal error"});
    }
};