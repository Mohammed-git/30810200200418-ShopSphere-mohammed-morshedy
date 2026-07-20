const productService = require("../services/product.service");

async function createProduct(req, res) {

    try {

        if (req.file) {
            req.body.image = req.file.filename;
        }

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

        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        res.json(product);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}

async function deleteProduct(req, res) {

    try {

        await productService.deleteProduct(req.params.id);

        res.json({
            message: "Product deleted successfully"
        });

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