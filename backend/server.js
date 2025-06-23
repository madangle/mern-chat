const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
// routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messsgeRoutes = require('./routes/messageRoutes');
// middlewares
app.use(cors()); // allow cors request
app.use(express.json()); // accepts json data
app.use(morgan('dev'));
// API Routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messsgeRoutes);
// DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// listening to port 5000
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})