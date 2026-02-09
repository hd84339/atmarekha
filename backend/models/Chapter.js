const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    chapterNumber: {
        type: Number,
        required: true
    },
    pages: [{
        type: String // URLs from Cloudinary (for image uploads)
    }],
    pdfUrl: {
        type: String // URL from Cloudinary (for PDF uploads)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chapter', chapterSchema);
