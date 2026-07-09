const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/admin.middleware");

const productController = require("../controllers/product.controller");
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post(
    "/",
    authenticate,
    authorizeAdmin,
    productController.createProduct
);
router.put(
    "/:id",
    authenticate,
    authorizeAdmin,
    productController.updateProduct
);

router.delete(
    "/:id",
    authenticate,
    authorizeAdmin,
    productController.deleteProduct
);

module.exports = router;