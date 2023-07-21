const express = require("express");
const handleImageUpload = require('../middleware/handleImageUpload'); // Update the 
// const multer = require('multer');

// // Set up multer middleware to handle file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const fileExtension = path.extname(file.originalname)
//         cb(null, uniqueSuffix + fileExtension)
//     }
// // });

// const upload = multer({ storage: storage });
const router = express.Router();
const { getAllProducts, getAllProductsTesting, addProduct, updateProduct, deleteProduct, updateImage } = require("../controllers/product");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);
router.route("/addProduct").post(addProduct);
router.route("/updateProduct").put(updateProduct);
router.route("/deleteProduct").delete(deleteProduct);
router.route("/uploadImage",).post(handleImageUpload, updateImage)
//, upload.single("image")



module.exports = router;