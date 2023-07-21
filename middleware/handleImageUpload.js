const multer = require('multer');
const path = require('path');

// Define the storage and file name for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtension = path.extname(file.originalname)
        cb(null, uniqueSuffix + fileExtension)
    }
});

// Set the upload options
const upload = multer({ storage });

// Custom middleware to handle the image upload
const handleImageUpload = upload.single('image');

module.exports = handleImageUpload;
