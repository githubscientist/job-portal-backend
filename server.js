const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./utils/config');
const app = require('./app');

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        app
            .listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            })
            .on('error', (err) => {
                console.error('Server error:', err.message);
            });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    })