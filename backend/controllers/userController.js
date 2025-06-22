const asyncHandler = require('express-async-handler')
const User = require('./../models/User');
const generateToken = require('./../utils/token');
const mongoose = require("mongoose");

// get all users
const getUsers = asyncHandler(async (req, res) => {
    const searchQuery = req.query.search;
    const keyword = searchQuery
        ? {
            $or: [
                { firstname: { $regex: searchQuery, $options: "i" } },
                { lastname: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
            ],
        }
        : {};
    const users = await User.find(keyword);
    console.log(req.query.keyword, keyword, users);
    res.send(users);
})

// get user by id
const getUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({
            success: false,
            message: 'Please provide a user id'
        })
    }
    // validate object id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success: false,
            message: 'Invalid user id'
        })
    }
    const user = await User.findById(id).select('-password');
    if(user){
        return res.status(200).json({
            success: true,
            data: user
        })
    }
    else{
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
})

// create or register new user
const createUser = asyncHandler(async(req, res) => {
    const {firstname, lastname, email, password, mobile} = req.body;
    // check all the required fields
    if(!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all the required fields'
        })
    }

    // check for user already exists with email or mobile
    const searchQuery = {
        $or: [
            { email: { $regex: email, $options: "i" } },
            { mobile: { $regex: mobile, $options: "i" } }, // Only if you also want to check mobile
        ],
    };
    const userExits = await User.findOne(searchQuery);
    if(userExits) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        })
    }

    // create new user and return the user data
    const user = await User.create({
        firstname, lastname, email, password, mobile
    });

    if(user) {
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
                status:user.status,
                token: generateToken(user._id)
            }
        })
    }
    else{
        res.status(400).json({
            success: false,
            message: 'User not created'
        })
    }
})

// update user
const updateUser = asyncHandler(async(req, res) => {
    const {firstname, lastname, email, mobile, avatar} = req.body;
    const id = req.params.id;
    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID'
        });
    }

    // Prevent updates to password or _id
    // const { password, _id, ...updateFields } = req.body;

    if(!firstname || !lastname || !email || !mobile ) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all the required fields'
        })
    }

    // check user exists with new email id or mobile
    const searchQuery = {
        $or: [
            { email: { $regex: email, $options: "i" } },
            { mobile: { $regex: mobile, $options: "i" } }
        ]
    }
    const userExits = await User.findOne(searchQuery);
    if(userExits) {
        return res.status(400).json({
            success: false,
            message: 'User already exists with this email or mobile'
        })
    }

    // find user to update by id
    const user = await User.findByIdAndUpdate(id, {
        firstname, lastname, email, mobile, avatar
    }, { new: true, runValidators: true}).select('-password');

    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    else{
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        })
    }
})

// delete user by id
const deleteUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID'
        })
    }

    const user = await User.findByIdAndDelete(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    else{
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    }
})

//
const changePassword = asyncHandler(async() => {

})

module.exports = {createUser, getUsers, getUser, updateUser, deleteUser, changePassword}