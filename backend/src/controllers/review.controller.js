const reviewService = require("../services/review.service");

async function createReview(req, res) {
    try {
        const review = await reviewService.createReview(
            req.user.id,
            req.params.productId,
            req.body
        );

        res.status(201).json(review);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function getProductReviews(req, res) {
    try {
        const reviews = await reviewService.getProductReviews(
            req.params.productId
        );

        res.json(reviews);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createReview,
    getProductReviews
};