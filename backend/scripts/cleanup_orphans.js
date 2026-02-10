const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Story = require('../models/Story');
const Chapter = require('../models/Chapter');

// Directories to check
const UPLOAD_DIRS = {
    covers: path.join(__dirname, '../uploads/covers'),
    pages: path.join(__dirname, '../uploads/pages'),
    pdfs: path.join(__dirname, '../uploads/pdfs')
};

const cleanupOrphans = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // 1. Collect all valid file paths from DB
        console.log('Fetching database records...');
        const stories = await Story.find({}, 'coverImage');
        const chapters = await Chapter.find({}, 'pages pdfUrl');

        const validFiles = new Set();

        stories.forEach(story => {
            if (story.coverImage) validFiles.add(path.basename(story.coverImage));
        });

        chapters.forEach(chapter => {
            if (chapter.pdfUrl) validFiles.add(path.basename(chapter.pdfUrl));
            if (chapter.pages && chapter.pages.length > 0) {
                chapter.pages.forEach(page => validFiles.add(path.basename(page)));
            }
        });

        console.log(`Found ${validFiles.size} valid files in database.`);

        // 2. Scan directories and delete orphans
        let deletedCount = 0;

        for (const [type, dirPath] of Object.entries(UPLOAD_DIRS)) {
            if (!fs.existsSync(dirPath)) continue;

            const files = fs.readdirSync(dirPath);
            console.log(`Checking ${type}: ${files.length} files found.`);

            files.forEach(file => {
                if (file === '.gitkeep') return; // Skip gitkeep

                if (!validFiles.has(file)) {
                    console.log(`Deleting orphan: ${type}/${file}`);
                    fs.unlinkSync(path.join(dirPath, file));
                    deletedCount++;
                }
            });
        }

        console.log(`Cleanup complete. Deleted ${deletedCount} orphaned files.`);
        process.exit(0);
    } catch (err) {
        console.error('Cleanup failed:', err);
        process.exit(1);
    }
};

cleanupOrphans();
