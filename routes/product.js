const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsTesting, addProduct, updateProduct, deleteProduct } = require("../controllers/product")

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);
router.route("/addProduct").post(addProduct);
router.route("/updateProduct").put(updateProduct);
router.route("/deleteProduct").delete(deleteProduct);



module.exports = router;