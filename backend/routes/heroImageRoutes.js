const express = require('express');
const router = express.Router();
const HeroImage = require('../models/HeroImage');

// Get all hero images
router.get('/', async (req, res) => {
    try {
        const images = await HeroImage.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new hero image
router.post('/', async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    const heroImage = new HeroImage({
        imageUrl,
    });

    try {
        const newImage = await heroImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a hero image
router.delete('/:id', async (req, res) => {
    try {
        const image = await HeroImage.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        await image.deleteOne();
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
