const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// GET all announcements
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json({ success: true, data: announcements });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new announcement
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newAnnouncement = new Announcement({ title, content });
        await newAnnouncement.save();
        res.status(201).json({ success: true, data: newAnnouncement });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update announcement
router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedAnnouncement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }
        res.json({ success: true, data: updatedAnnouncement });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE announcement
router.delete('/:id', async (req, res) => {
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
        if (!deletedAnnouncement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }
        res.json({ success: true, message: 'Announcement deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
