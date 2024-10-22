import mongoose, { Types } from "mongoose";
import { User } from "./user.models";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },

    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: false
    },

    messageType: {
        type: String,
        enum: ["text", "image", "file", "video", "audio"],
        default: 'text'
    },

    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    },

    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    reactions: [
        {
            emoji: {
                type: String
            },
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    ]




}, {timestamps: true})
// logic for handling msgs
messageSchema.pre("save", async function(next){
    if(!this.receiver && !this.chatRoom){
        return next(new Error("Either receiver or chatRoom must be provided."))
    }
    else if(this.receiver && this.chatRoom){
        return next(new Error("Both receiver and chatRoom cannot be provided"))
    }

    next();
})