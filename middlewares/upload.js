const multer = require('multer');
const path = require('path');
const fs = require('fs');

// create uploads directory if it doesn't exist
const createUploadsDir = () => {
    const uploadDirs = ['uploads', 'uploads/resumes', 'uploads/profiles', 'uploads/companies'];
    uploadDirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

createUploadsDir();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = 'uploads/';

        // determine upload path based on fieldname
        if (file.fieldname === 'resume') {
            uploadPath += 'resumes/';
        } else if (file.fieldname === 'profilePicture') {
            uploadPath += 'profiles/';
        } else if (file.fieldname === 'companyLogo') {
            uploadPath += 'companies/';
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'resume') {
        // Accept only pdf files for resumes
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed for resumes'), false);
        }
    } else if (file.fieldname === 'profilePicture' || file.fieldname === 'companyLogo') {
        // Accept only image files for profile pictures and company logos
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed for profile pictures and company logos'), false);
        }
    } else {
        cb(new Error('Unknown field'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: fileFilter
});

module.exports = upload;