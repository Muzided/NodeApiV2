const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
    },
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.9,
    },
    image: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum: {
            values: [
                "apple", "samsung", "dell"
            ],
            message: `{VALUE} is not suported`
        }
    },
})

module.exports = mongoose.model("Product", productSchema);