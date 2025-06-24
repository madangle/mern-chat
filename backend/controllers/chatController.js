const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');

const Chat = require('../models/Chat');
const User = require("../models/User");

// access chat
const accessChat = asyncHandler(async (req, res) => {
  	const { userId } = req.body;
  	if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

	var isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
    .populate("users", "-password")
    .populate("latestMessage");

	isChat = await User.populate(isChat, {
		path: "latestMessage.sender",
		select: "name pic email",
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} 
	else {
		var chatData = {
		chatName: "sender",
		isGroupChat: false,
		users: [req.user._id, userId],
	};

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id })
	  .populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } 
	catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// create new one to one or group chat
const createChat = asyncHandler(async(req, res) => {
    const { name, userId, users, isGroupChat } = req.body;
    if(!name || !userId || !users) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all the required fields'
        })
    }

    // check for duplicate chat

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
        return res.status(201).json({
            success: true,
            message: 'Chat created successfully',
            data: chat
        })
    }
    else{
        return res.status(400).json({
            success: false,
            message: 'Chat not created'
        })
    }
});

// get all chats of a user
const getChats = asyncHandler(async(req, res) => {
    const { userId } = req.body;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    // find user chats
    const chats = await Chat.find({
        // users: { $elemMatch: { $eq: userId } } // both works
        users: userId
    })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("groupAdmin", "-password");

    if(chats){
        // remove the current user from the users array
        const filtered = chats.map( chat => {
            const otherUsers = chat.users.filter(user => user._id.toString() !== userId.toString());
            return {
                ...chat.toObject(),
                users: otherUsers
            }
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully brought user chats',
            data: filtered
        })
    }
    else {
        return res.status(404).json({
            success: false,
            message: "Chats not found"
        })
    }
});

// delete a chat by id
const deleteChat = asyncHandler(async(req, res) => {
    const chatId = req.params.id;
    if(!chatId || !mongoose.Types.ObjectId.isValid(chatId)){
        return res.status(404).json({
            success: false,
            message: "Chat Id not found or invalid chat Id"
        })
    } 

    const chat = Chat.findByIdAndDelete(chatId);
    if(chat){
        return res.status(200).json({
            status: false,
            message: "Deleted chat successfully"
        })
    }
    else {
        return res.status(404).json({
            status: false,
            message: "Chat not found."
        })
    }
});

const getChat = asyncHandler(async(req, res) => {});
const updateChat = asyncHandler(async(req, res) => {})
// createGroupChat, addtoGroupChat, removeFromGroupChat, renameGroupChat
module.exports = {createChat, getChats, getChat, deleteChat, updateChat};