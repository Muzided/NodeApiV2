const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");

dotenv.config();
const addUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            res.status(400);
            throw new Error("All feilds must be mandatory !");
        }
        const users = await User.create(req.body)
        res.status(200).json({ "User": "Updated" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })

    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory!")
    }
    const userAvalable = await User.findOne({ email });
    if (userAvalable) {
        res.status(400);
        throw new Error("User already registered")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashPassword);
    const user = await User.create({
        name,
        email,
        password: hashPassword,
    });
    console.log(`User Created Successfully${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("condition uno", !email || !password)
    if (!email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory!");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "12m" }
        );

        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("emaiil or password not correct");
    }
    res.json({ message: "Register the login" });
});


const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

module.exports = { addUser, registerUser, loginUser, currentUser };
