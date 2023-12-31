const dotenv = require('dotenv');
const express = require("express");
const connectDB = require("./db/connect");
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;
const product_routes = require("./routes/product");
const user_routes = require("./routes/user");
const errorHandler = require('./middleware/errorHandler');
var cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
dotenv.config();

app.use(bodyParser.json());
app.use('/api/product', product_routes);
app.use('/api/user', user_routes)
app.use(errorHandler);

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
