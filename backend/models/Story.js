const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String, // URL from Cloudinary
        required: true
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed', 'Hiatus'],
        default: 'Ongoing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Story', storySchema);
