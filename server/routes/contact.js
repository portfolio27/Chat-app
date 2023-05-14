const express = require('express');
const { verifyToken } = require('../middleware/auth.js');
const { User } = require('../models/User.js');

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

router.post('/contact', verifyToken, async (req, res) => {
    
    const {token, userId} = req.body;

    try {
        const user = await User.findOne({_id: userId});
        if(!user) { res.status(401).json({ message: "Access denied"})}

        res.status(200).json({message: user.contacts})
    } catch (err) {
        res.status(500).json({message: err})
    }

});

router.post('/get-contact', verifyToken, async (req, res) => {
    const {userId} = req.body;

    if (!userId) { return res.status(422).json({message: "No data"})}

    try {
        
        const user = await User.findById(userId);
        if(!user) {return res.status(403).json({message: "User not found"})}

        return res.status(200).json({message: user.contacts})

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;