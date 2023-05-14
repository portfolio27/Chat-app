const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    chatId: {
        required: true,
        type: String
    },
    user1: {
        required: true,
        type: String,
    },
    user2: {
        required: true,
        type: String,
    },
    chats: {
        type: Array,
        default: [],
      },
})

const Chat = mongoose.model("Chat", ChatSchema)

module.exports = Chat;