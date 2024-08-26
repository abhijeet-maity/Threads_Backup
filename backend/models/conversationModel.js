// const mongoose = require('mongoose');

import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    lastMessage: {
        text: String,
        sender: { type : mongoose.Schema.Types.ObjectId, ref: "User" },
        seen : {
            type: Boolean,
            default: false,
        },
    },
    
},
{timeStamps: true}
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;

// module.exports = Conversation;