const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Story = require('../models/Story');
const upload = require('../config/multerConfig');

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

// Get chapters for a specific story
router.get('/:storyId', async (req, res) => {
    try {
        const chapters = await Chapter.find({ story: req.params.storyId }).sort({ chapterNumber: 1 });
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new chapter (supports multiple images OR single PDF)
router.post('/:storyId', (req, res, next) => {
    console.log('=== Upload Request Received ===');
    console.log('Story ID:', req.params.storyId);

    upload.array('pages')(req, res, (err) => {
        if (err) {
            console.error('=== MULTER ERROR ===');
            console.error('Error:', err);
            console.error('Error code:', err.code);
            console.error('Error message:', err.message);

            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: 'File too large. Maximum size is 500MB.'
                });
            }

            return res.status(500).json({
                message: 'File upload failed: ' + err.message
            });
        }

        next();
    });
}, async (req, res) => {
    try {
        console.log('=== Chapter Upload Started ===');
        console.log('Story ID:', req.params.storyId);
        console.log('Request body:', req.body);
        console.log('Files received:', req.files?.length || 0);

        let { title, chapterNumber, pdfUrl } = req.body;
        const storyId = req.params.storyId;

        console.log('Checking if story exists...');
        const story = await Story.findById(storyId);
        if (!story) {
            console.log('Story not found!');
            return res.status(404).json({ message: 'Story not found' });
        }
        console.log('Story found:', story.title);

        let pages = [];
        pdfUrl = pdfUrl || '';

        if (req.files && req.files.length > 0) {
            console.log('Processing uploaded files...');
            req.files.forEach((file, index) => {
                console.log(`File ${index + 1}:`, {
                    mimetype: file.mimetype,
                    size: file.size,
                    filename: file.filename
                });

                if (file.mimetype === 'application/pdf') {
                    pdfUrl = `/uploads/${file.filename}`;
                    console.log('PDF detected, set pdfUrl:', pdfUrl);
                } else {
                    pages.push(`/uploads/${file.filename}`);
                    console.log('Image added to pages');
                }
            });
        }

        console.log('Creating chapter document...');
        const chapter = new Chapter({
            story: storyId,
            title,
            chapterNumber,
            pages: pages,
            pdfUrl: pdfUrl
        });

        console.log('Saving chapter to database...');
        const savedChapter = await chapter.save();
        console.log('Chapter saved successfully!', savedChapter._id);

        res.status(201).json(savedChapter);
    } catch (err) {
        console.error('=== ERROR IN CHAPTER UPLOAD ===');
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
        console.error('Full error:', err);
        console.error('Stack trace:', err.stack);
        res.status(400).json({ message: err.message, error: err.toString() });
    }
});

// Update a chapter
router.put('/:id', upload.array('pages'), async (req, res) => {
    try {
        const { title, chapterNumber, pdfUrl } = req.body;
        const chapterId = req.params.id;

        const chapter = await Chapter.findById(chapterId);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

        if (title) chapter.title = title;
        if (chapterNumber) chapter.chapterNumber = chapterNumber;
        if (pdfUrl) chapter.pdfUrl = pdfUrl;

        // If new files are uploaded, replace existing pages or update pdfUrl
        if (req.files && req.files.length > 0) {
            const newPages = [];
            let newPdfUrl = null;

            req.files.forEach(file => {
                if (file.mimetype === 'application/pdf') {
                    newPdfUrl = `/uploads/${file.filename}`;
                } else {
                    newPages.push(`/uploads/${file.filename}`);
                }
            });

            if (newPages.length > 0) {
                chapter.pages = newPages;
                // If new images are uploaded, we might want to clear the PDF if it's meant to be an image chapter now
                // but let's be conservative: only replace if images were actually provided.
            }

            if (newPdfUrl) {
                chapter.pdfUrl = newPdfUrl;
                // If a PDF is uploaded, clear images to switch mode
                chapter.pages = [];
            }
        }

        const updatedChapter = await chapter.save();
        res.json(updatedChapter);
    } catch (err) {
        console.error('Error updating chapter:', err);
        res.status(400).json({ message: err.message, error: err });
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
