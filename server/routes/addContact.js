const express = require('express');
const { verifyToken } = require('../middleware/auth.js');
const { User } = require('../models/User.js');
const Chat = require('../models/chat.js')

const router = express.Router();

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


router.post('/add', verifyToken, async (req, res) => {

    const {query, userId} = req.body;

    if(!query) { return res.status(422).json({message: "Fill the field properly"})}

    try {

        const user = await User.findOne({_id: userId})

        const queryUser = await User.findOne({userId: query});
        if(!queryUser) { return res.status(401).json({message: "User not found"})}

        const commonKey = generateString(15);
            
        const newChat = await new Chat({chatId: commonKey, user1: user._id, user2: queryUser._id, chats: []});
        await newChat.save()
        await user.contacts.push([
            `${queryUser.firstName} ${queryUser.lastName}`,
            queryUser._id,
            queryUser.userId,
            queryUser.picturePath,
            newChat._id,
            newChat._id
        ]   );
        user.save();

        await queryUser.contacts.push([
            `${user.firstName} ${user.lastName}`,
            user._id,
            user.userId,
            user.picturePath,
            newChat._id,
            newChat._id
        ])
        queryUser.save();

        res.status(200).json({message: user.contacts})

    } catch (err) {
        return res.status(500).json({message: err})
    }

})

module.exports = router;