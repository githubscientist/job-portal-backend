require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || 'development';
const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
const GOOGLE_USER_EMAIL = process.env.GOOGLE_USER_EMAIL;

module.exports = {
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    NODE_ENV,
    GOOGLE_APP_PASSWORD,
    GOOGLE_USER_EMAIL
}