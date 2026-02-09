const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Story = require('../models/Story');
const { parser } = require('../config/cloudinaryConfig');

// Get chapters for a specific story
router.get('/:storyId', async (req, res) => {
    try {
        const chapters = await Chapter.find({ story: req.params.storyId }).sort({ chapterNumber: 1 });
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single chapter by ID
router.get('/detail/:id', async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new chapter (supports multiple images OR single PDF)
router.post('/:storyId', parser.array('pages'), async (req, res) => {
    try {
        const { title, chapterNumber, pdfUrl } = req.body;
        const storyId = req.params.storyId;

        const story = await Story.findById(storyId);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        let pages = [];
        if (req.files && req.files.length > 0) {
            pages = req.files.map(file => file.path);
        }

        // If 'pdfUrl' is sent as body (e.g. from direct upload or if file uploaded as pdf type in array)
        // Cloudinary 'raw' upload might be needed for PDFs if they are large, but for now assuming standard image array or pdf link.
        // If using parser.array, files are in req.files.

        const chapter = new Chapter({
            story: storyId,
            title,
            chapterNumber,
            pages: pages, // Array of image URLs
            pdfUrl: pdfUrl || '' // Optional direct URL if managed differently
        });

        const savedChapter = await chapter.save();
        res.status(201).json(savedChapter);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Update a chapter
router.put('/:id', parser.array('pages'), async (req, res) => {
    try {
        const { title, chapterNumber, pdfUrl } = req.body;
        const chapterId = req.params.id;

        const chapter = await Chapter.findById(chapterId);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

        if (title) chapter.title = title;
        if (chapterNumber) chapter.chapterNumber = chapterNumber;
        if (pdfUrl) chapter.pdfUrl = pdfUrl;

        // If new files are uploaded, replace existing pages
        if (req.files && req.files.length > 0) {
            const newPages = req.files.map(file => file.path);
            chapter.pages = newPages;
        }

        const updatedChapter = await chapter.save();
        res.json(updatedChapter);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a chapter
router.delete('/:id', async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

        await chapter.deleteOne();
        res.json({ message: 'Chapter deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
