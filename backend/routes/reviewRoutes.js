const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a review
router.post('/', async (req, res) => {
    try {
        const { storyId, user, rating, comment } = req.body;
        const review = new Review({
            story: storyId,
            user,
            rating,
            comment
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get reviews for a story
router.get('/story/:storyId', async (req, res) => {
    try {
        const reviews = await Review.find({ story: req.params.storyId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all reviews (for admin)
router.get('/all', async (req, res) => {
    try {
        const reviews = await Review.find().populate('story', 'title');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
