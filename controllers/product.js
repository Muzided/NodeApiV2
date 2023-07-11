const Product = require("../models/product");
const getAllProducts = async (req, res) => {

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
    let apiData = Product.find(queryObject);


    const Products = await apiData;

    res.status(200).json({ Products })
}

const getAllProductsTesting = async (req, res) => {
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
}

// const addProduct = async (req, res) => {
//     try {
//         const Products = await Product.create(req.body)
//         res.status(200).json({ "Products": "Updated" })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: error.message })

//     }
// }
const addProduct = async (req, res) => {
    try {
        const products = req.body;

        for (const product of products) {
            const newProduct = new Product(product);
            const validationResult = newProduct.validateSync();
            if (validationResult) {
                const errors = Object.values(validationResult.errors).map(
                    (error) => error.message
                );
                return res.status(400).json({ errors });
            }
        }

        const createdProducts = await Product.create(products);
        res.status(200).json({ products: createdProducts });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {

        //const { id } = req.query;
        const { id } = req.body;
        console.log(id)
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).send({ message: `Connot find Product with ${id}` })
        }

        res.status(200).send({ message: "updatedProduct" })
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });

    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ message: `Cannot find product by id ${id}` })
        }
        res.status(200).send({ message: "Deleted" });

    } catch (error) {
        res.status(500).send({ message: error.message });

    }
}



module.exports = { getAllProducts, getAllProductsTesting, addProduct, updateProduct, deleteProduct };