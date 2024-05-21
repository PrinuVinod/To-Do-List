const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({
        message: 'User registered successfully'
    });
});

router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = await User.findOne({
        username
    });
    if (!user) return res.status(400).json({
        message: 'Invalid credentials'
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({
        message: 'Invalid credentials'
    });

    const token = jwt.sign({
        id: user._id
    }, 'secretKey');
    res.json({
        token
    });
});

module.exports = router;
