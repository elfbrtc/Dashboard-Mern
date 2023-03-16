const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel.js');


const registerUser = asyncHandler (async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const userExists = await User.findOne({ username }) 

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            password: user.password,
            token : generateToken(user._id)
        })
    } 
    else {
        res.status(400)
        throw new Error('Invalid user data');
    }

    res.json({message: 'User created successfully'});
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid username or password');
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {
    registerUser,
    loginUser,
};