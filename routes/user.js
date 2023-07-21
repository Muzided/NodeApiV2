const express = require("express");
const router = express.Router();
const { addUser, registerUser, loginUser, currentUser } = require("../controllers/user");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/addUser").post(addUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);


module.exports = router;