const mongoose = require('mongoose');

const heroImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('HeroImage', heroImageSchema);
