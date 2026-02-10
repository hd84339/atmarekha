const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        console.log('Cloudinary processing file:', file.originalname, 'Type:', file.mimetype);

        // For PDFs, use 'raw' resource type, for images use 'image'
        const resourceType = file.mimetype === 'application/pdf' ? 'raw' : 'image';

        return {
            folder: 'atmarekha_stories',
            allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
            resource_type: resourceType,
            // Increase chunk size for large files
            chunk_size: 6000000 // 6MB chunks
        };
    }
});

const parser = multer({
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024 // 200MB max file size
    }
});

module.exports = { cloudinary, parser };
