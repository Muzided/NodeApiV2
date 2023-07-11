const User = require("../models/user");

// const addUser = async (req, res) => {
//     try {
//         const users = req.body;
//         console.log('user', users)

//         // for (const product of users) {
//         //     const newProduct = new Product(product);
//         //     const validationResult = newProduct.validateSync();
//         //     if (validationResult) {
//         //         const errors = Object.values(validationResult.errors).map(
//         //             (error) => error.message
//         //         );
//         //         return res.status(400).json({ errors });
//         //     }
//         // }

//         const createdProducts = await Product.create(users);
//         res.status(200).json({ users: createdUser });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: error.message });
//     }
// };
const addUser = async (req, res) => {
    try {
        const users = await User.create(req.body)
        res.status(200).json({ "User": "Updated" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })

    }
}
module.exports = { addUser };
