const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const cartController = require("../controllers/cart.controller");

router.post(
    "/",
    authenticate,
    cartController.addToCart
);
router.get(
    "/",
    authenticate,
    cartController.getCart
);
router.delete(
    "/:id",
    authenticate,
    cartController.removeFromCart
);

module.exports = router;