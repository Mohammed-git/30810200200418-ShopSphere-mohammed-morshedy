const productService = require("../services/product.service");


async function createProduct(req, res) {
    try {
        
        if (req.file) {
            req.body.image = req.file.filename;
        }
        if (req.file) {
    req.body.image = req.file.filename;
}

console.log(req.body);
console.log(req.file);

        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts(req.query);
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}


async function updateProduct(req, res) {
    try {
        res.json({ message: "Update feature coming soon" });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


async function deleteProduct(req, res) {
    try {
        res.json({ message: "Delete feature coming soon" });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};