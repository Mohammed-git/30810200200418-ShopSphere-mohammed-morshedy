const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const reviewController = require("../controllers/review.controller");

router.get("/:productId", reviewController.getProductReviews);

router.post(
    "/:productId",
    authenticate,
    reviewController.createReview
);

module.exports = router;