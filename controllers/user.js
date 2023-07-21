const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const fs = require('fs');
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
        return res.status(201).json({ message: "User Registered successfully" })
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }

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



UpdateImage=async(req,res,next)=>{
    try
    {
        const file = req.file;
        const id = req.userId;
        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const url = `${config.react_app_server_url}/public/images/${file.filename}`;
        const user = await userModel.findById(id);
        user.imageUrl = url;
        await user.save();
        return res.status(200).json({success: true, Message: "Sucessfully Don", data:{imageUrl:url}});
    }
    catch(e)
    {
        console.log('error', e)
        return res.status(e.status || 500).json({ Suceess: false, msg: e.message, data: {} })
    }
}

module.exports = { addUser, registerUser, loginUser, currentUser };
