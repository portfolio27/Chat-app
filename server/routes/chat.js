const {User} = require('../models/User.js')
const { verifyToken } = require('../middleware/auth.js')
const express = require('express');
const Chat = require('../models/chat.js')

const router = express.Router()

router.post('/chat', verifyToken, async (req, res) => {
    const {chatId, message} = req.body;
    if (!chatId) return res.status(422).json({message: "Chat is not valid"})
    if (!message) return res.status(422).json({message: "message missing"})
    try{
        const chat = await Chat.findById(chatId)
        chat.chats.push(message);
        await chat.save();

        return res.status(200).json({message: chat})
    } catch(err) {
        return res.status(500).json({error: err})
    }
})

router.post('/get-chat', verifyToken, async (req, res)=> {
    const {chatId} = req.body;
    if (!chatId) return res.status(422).json({message: "Chat is not valid"})
    
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(200).json({message: []})

        return res.status(200).json({message: chat})
    } catch (error) {
        return res.status(500).json({error: error})
    }
})

module.exports = router
