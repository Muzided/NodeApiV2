const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter name"]
    },
    password: {
        type: String,
        require: [true, "please enter password"]
    }
})

module.exports = mongoose.model("User", userSchema);