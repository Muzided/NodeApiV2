const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/user")

router.route("/addUser").post(addUser);

module.exports = router;