import mongoose from "mongoose"
import { Message } from "./message.models";


const chatRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true
    },

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'archived'],
        default: 'active'
    }

}, { timestamps: true });

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
