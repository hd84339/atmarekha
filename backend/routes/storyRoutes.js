const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const upload = require('../config/multerConfig');
const fs = require('fs');
const path = require('path');

// Get all stories
// Get all stories (with optional search and category filter)
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        const stories = await Story.find(query).sort({ createdAt: -1 });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single story
router.get('/detail/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Like a story
router.put('/:id/like', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        story.likes = (story.likes || 0) + 1;
        await story.save();
        res.json({ likes: story.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new story (with cover image)
router.post('/', upload.single('coverImage'), async (req, res) => {
    try {
        const { title, author, description, status, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Cover image is required' });
        }

        const story = new Story({
            title,
            author,
            description,
            status,
            category,
            coverImage: `/uploads/covers/${req.file.filename}` // Local file URL
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

        // Delete cover image if it exists
        if (story.coverImage) {
            const relativePath = story.coverImage.startsWith('/') ? story.coverImage.slice(1) : story.coverImage;
            const filePath = path.join(__dirname, '..', relativePath);

            fs.unlink(filePath, (err) => {
                if (err) console.error('Failed to delete cover image:', err);
                else console.log('Deleted cover image:', filePath);
            });
        }

        await story.deleteOne();
        res.json({ message: 'Story deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
