const express = require('express');
const authRouter = require('./routes/authRoutes');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/auth', authRouter);

// serve uploaded files
app.use('/uploads', express.static('uploads'));

module.exports = app;