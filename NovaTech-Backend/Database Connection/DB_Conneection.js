const mongoose = require('mongoose')
require('dotenv').config()

const ConnnectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URL)
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process on failure
    }
}

module.exports={
    ConnnectDB
}