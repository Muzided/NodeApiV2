const dotenv = require('dotenv');
const express = require("express");
const connectDB = require("./db/connect");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const product_routes = require("./routes/product");

dotenv.config();

app.use(bodyParser.json());
app.use('/api/product', product_routes);

app.get("/", (req, res) => {
    res.send("hi, I am live");
});

const Start = async () => {
    try {
        await connectDB(process.env.MANGODB_URL);
        app.listen(PORT, () => {
            console.log(`Running on port ${PORT}`);
        });
    } catch (error) {
        console.log('error', error);
    }
};

Start();
