const asyncHandler = require("express-async-handler");
const Chat = require('../models/Chat');
const User = require("../models/User");

const createChat = asyncHandler(async(req, res) => {
    const { name, userId, users, isGroupChat } = req.body;
    if(!name || !userId || !users) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all the required fields'
        })
    }

    // adding current user to users array
    if(!users.includes(userId)) {
        users.push(userId);
    }

    const user = await User.findById(userId);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    const chat = await Chat.create({
        name, userId, users, isGroupChat, groupAdmin: user._id
    });

    if(chat) {
        res.status(201).json({
            success: true,
            message: 'Chat created successfully',
            data: chat
        })
    }
    else{
        res.status(400).json({
            success: false,
            message: 'Chat not created'
        })
    }
});

const getChats = asyncHandler(async(req, res) => {})
const getChat = asyncHandler(async(req, res) => {})
const deleteChat = asyncHandler(async(req, res) => {})
const updateChat = asyncHandler(async(req, res) => {})
module.exports = {createChat, getChats, getChat, deleteChat, updateChat};