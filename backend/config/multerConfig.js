const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['uploads/covers', 'uploads/pages', 'uploads/pdfs'];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine folder based on field name or file type
        let folder = 'uploads/';

        if (req.path.includes('/stories')) {
            folder += 'covers/';
        } else if (file.mimetype === 'application/pdf') {
            folder += 'pdfs/';
        } else {
            folder += 'pages/';
        }

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        // Generate unique filename: timestamp-random-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_');

        cb(null, sanitizedName + '-' + uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images (JPEG, PNG, GIF) and PDFs are allowed'));
    }
};

// Multer instance with generous limits
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB max file size
    }
});

module.exports = upload;
