const dotenv = require('dotenv')
const connectDB = require("./db/connect");
const Product = require("./models/product");
dotenv.config();
const ProductsData = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MANGODB_URL);
        await Product.deleteMany();
        await Product.create(ProductsData);
        console.log("Success");

    } catch (error) {
        console.log("error", error);

    }
}

start();