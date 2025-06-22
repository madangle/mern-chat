const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Basic Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// listening to port 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})