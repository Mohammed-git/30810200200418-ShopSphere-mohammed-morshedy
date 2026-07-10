const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const orderController = require("../controllers/order.controller");

router.post(
    "/",
    authenticate,
    orderController.createOrder
);

module.exports = router;