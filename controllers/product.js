const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const getAllProducts = asyncHandler(async (req, res) => {

    const { company, name, featured, sort, select, page, limit } = req.query;

    const queryObject = {}

    // console.log('Await', apiData);
    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (sort) {
        // let sortFix = sort.replace(",", " ");
        let sortFix = sort.split(",").join(" ");

        apiData = apiData.sort(sortFix);
    }
    if (select) {
        //let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");

        apiData = apiData.select(selectFix);
    }



    if (page) {
        let pagee = Number(req.query.page) || 1;
        let limitt = Number(req.query.limit) || 3;
        console.log("pageee", pagee);
        console.log("limit", limitt);

        let skip = (pagee - 1) * limitt;
        console.log("skip", skip);
        apiData = apiData.skip(skip).limit(limitt);
    }
    let apiData = Product.find({ user_id: req.user.id });


    const Products = await apiData;

    res.status(200).json({ Products })
});

const getAllProductsTesting = asyncHandler(async (req, res) => {
    const Products = await Product.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"

            }
        }
    ]);
    res.status(200).json(Products);
});

// const addProduct = async (req, res) => {
//     try {
//         const Products = await Product.create(req.body)
//         res.status(200).json({ "Products": "Updated" })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: error.message })

//     }
// }
const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, price, feature, rating, company } = req.body;


        const createdProducts = await Product.create({
            name, price, feature, rating, company, user_id: req.user.id
        });
        res.status(200).json({ products: createdProducts._id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


const updateProduct = asyncHandler(async (req, res) => {
    try {

        //const { id } = req.query;
        const { id } = req.body;



        console.log(id)
        const product = await Product.findById(id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }
        if (product.user_id.toString() !== req.user.id.toString()) {
            res.status(403);
            throw new Error("Access denied to update other user products");
        }
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).send({ message: "updatedProduct" })
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message, data: { updateProduct } });

    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found")

        }
        if (product.user_id.toString() !== req.user.id.toString()) {
            res.status(403);
            throw new Error("Access denied to update other user products");
        }
        await Product.deleteOne({ _id: id });
        res.status(200).send({ message: "Deleted" });

    } catch (error) {
        res.status(500).send({ message: error.message });

    }
});

const updateImage = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;
        const file = req.file;

        if (!file) {
            res.status(400)
            throw new Error('No file uploaded');

        }
        const url = `http://localhost:5000/public/images/${file.filename}`;
        const product = await Product.findById(id);
        product.image = url;
        await product.save();
        return res.status(200).json({ success: true, Message: "Sucessfully Done", data: { imageUrl: url } });



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
const UpdateImage = asyncHandler(async (req, res, next) => {
    try {
        const file = req.file;
        const id = req.userId;
        if (!file) {
            res.status(400)
            throw new Error('No file uploaded.');

        }
        const url = `http://localhost:5000/public/images/${file.filename}`;

        return res.status(200).json({ success: true, Message: "Sucessfully Don", data: { imageUrl: url } });
    }
    catch (e) {
        console.log('error', e)
        return res.status(e.status || 500).json({ Suceess: false, msg: e.message, data: {} })
    }
});



module.exports = { getAllProducts, getAllProductsTesting, addProduct, updateProduct, deleteProduct, UpdateImage, updateImage };