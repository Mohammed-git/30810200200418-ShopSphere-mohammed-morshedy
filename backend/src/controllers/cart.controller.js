const cartService = require("../services/cart.service");

async function addToCart(req, res) {

    try {

        const cart = await cartService.addToCart(

            req.user.id,

            req.body.productId,

            req.body.quantity

        );

        res.status(201).json(cart);

    } catch (error) {

        res.status(400).json({

            message: error.message

        });

    }

}
async function getCart(req, res) {

    try {

        const cart = await cartService.getCart(req.user.id);

        res.json(cart);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}
async function removeFromCart(req, res) {

    try {

        const result = await cartService.removeFromCart(
            req.user.id,
            req.params.id
        );

        res.json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};