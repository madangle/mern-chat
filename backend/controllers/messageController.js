const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const Chat = require('../models/Chat');
const User = require("../models/User");
const Message = require('../models/Message');

const createMessage = asyncHandler(async(req, res) => {
  const { sender, chat, content, readBy } = req.body;

  // check for all the fields
  if(!sender || !chat || !content){
    return res.status(400).json({
      status:false,
      message: "Please provide all the data"
    })
  }

  // check validdity of sender or chat
  if(!mongoose.Types.ObjectId.isValid(chat) || !mongoose.Types.ObjectId.isValid(sender)){
    return res.status(404).json({
      status:false,
      message: "Invalid Sender or invalid chat"
    })
  }

  // check sender exists and chat exists
  const senderExists = await User.findById(sender);
  const chatExists = await Chat.findById(chat);
  if(!senderExists || !chatExists){
    return res.status(404).json({
      status:false,
      message: "Invalid Sender or invalid chat"
    })
  }

  const message = await Message.create({
    sender, chat, content, readBy
  });

  if(message) {
      return res.status(201).json({
          success: true,
          message: 'Message sent successfully',
          data: message
      })
  }
  else{
      return res.status(400).json({
          success: false,
          message: 'Message not sent'
      })
  }
  
})

const getMessages = asyncHandler(async(req, res) => {
  const chatId = req.params.chatId;
  if(!chatId){
    return res.status(400).json({
      success: false,
      message: 'Please provide a chat id'
    })
  }

  if(!mongoose.Types.ObjectId.isValid(chatId)){
    return res.status(404).json({
      status: false,
      message: "Invalid chat id"
    })
  }

  const messages = await Message.find({
    chat: chatId
  })
  .populate("sender", "-password")
  .populate("chat")
  .populate("readBy", "-password");

  if(messages){
    return res.status(200).json({
      success: true,
      data: messages
    })
  }
  else{
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    })
  }
})

module.exports = {createMessage, getMessages}