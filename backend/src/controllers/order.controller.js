const orderService = require("../services/order.service");

async function createOrder(req, res) {

    try {

        const order = await orderService.createOrder(req.user.id);

        res.status(201).json(order);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}

module.exports = {
    createOrder
};