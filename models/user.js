const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the user name"]
    },
    email: {
        type: String,
        require: [true, "please enter email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        require: [true, "please add the user password"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);