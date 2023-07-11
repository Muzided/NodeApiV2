const dotenv = require('dotenv')
const express = require("express");
const connectDB = require("./db/connect")
const app = express();
const PORT = process.env.PORT || 5000;
product_routes = require("./routes/product")
dotenv.config();

app.get("/", (req, res) => {
    res.send("hi i am live");
});

app.use('/api/product', product_routes)

const Start = async () => {
    try {
        await connectDB(process.env.MANGODB_URL);
        app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })
    } catch (error) { console.log('error', e) }
}

Start();