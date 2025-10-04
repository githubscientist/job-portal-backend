const express = require('express');
const authRouter = require('./routes/authRoutes');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
const errorRoute = require('./utils/errorRoute');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(logger);

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', applicationRouter);

// serve uploaded files
app.use('/uploads', express.static('uploads'));

app.use(errorRoute);

module.exports = app;