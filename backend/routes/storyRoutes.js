const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const { parser } = require('../config/cloudinaryConfig');

// Get all stories
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find().sort({ createdAt: -1 });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new story (with cover image)
router.post('/', parser.single('coverImage'), async (req, res) => {
    try {
        const { title, author, description, status } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Cover image is required' });
        }

        const story = new Story({
            title,
            author,
            description,
            status,
            coverImage: req.file.path // Cloudinary URL
        });

        const savedStory = await story.save();
        res.status(201).json(savedStory);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a story
router.delete('/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // TODO: Ideally delete cover image from Cloudinary here too

        await story.deleteOne();
        res.json({ message: 'Story deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
