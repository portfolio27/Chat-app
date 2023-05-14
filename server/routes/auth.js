const express = require('express');
const {User} = require('../models/User.js')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const urlencoderParse = bodyParser.urlencoded({extended: true})

router.use(express.json())

router.get('/home', (req, res)=>{
    res.send('Hii from home')
})

router.post('/auth/login', async (req, res) => 
{
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(422).json({message: "Fill fields properly!"});
    }
    try {
        const user = await User.findOne({email: email})
        if (!user) { res.status(401).json({message: 'Invalid Credentials'})};

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

            res.cookie('webToken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            })
            res.cookie('user', user, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            res.status(200).json({message: user, token: token});
        } else {
            return res.status(401).json({message: 'Invalid Credentials'})
        }

    } catch (err) {
        res.status(500).json({message: "error"})
    }
})

router.post('/auth/register', async (req, res) => {
    const {
        firstName,
        lastName,
        userId,
        email,
        password,
        picturePath,
    } = req.body;

    if (!firstName || !lastName || !userId || !email || !password || !picturePath) {
        return res.status(422).json({message: "Fill the fields properly", link: "register"})
    }

    try {

        const isUser = await User.findOne({email: email});
        if (isUser) { return res.status(409).json({message: "User already exist with current email", link: "login"})}

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({firstName, lastName, userId, email, password: passwordHash, picturePath, contacts: []})
        const saveUser = await user.save();

        return res.status(200).json({message: "User created", link: "/contact", user: saveUser})

    } catch (err) {
        return res.status(500).json({message: "Error occur", link: "register"})
    }
})

module.exports = router;