import mongoose from "mongoose";


const typeIndicatorSchema = new mongoose.Schema({
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: true
    },

    isTyping: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

export const TypeIndicator = mongoose.model("TypeIndicator", typeIndicatorSchema);