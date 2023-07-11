const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsTesting, addProduct } = require("../controllers/product")

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);
router.route("/addProduct").post(addProduct);

module.exports = router;