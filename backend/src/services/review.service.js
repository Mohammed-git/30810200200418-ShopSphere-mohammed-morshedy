const Review = require("../models/Review");
const prisma = require("../config/prisma");

async function createReview(userId, productId, reviewData) {
    const { rating, comment } = reviewData;

    if (!rating || !comment) {
        throw new Error("Rating and comment are required");
    }

    const product = await prisma.product.findUnique({
        where: {
            id: Number(productId)
        }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const review = await Review.create({
        productId: Number(productId),
        userId: Number(userId),
        userName: user.name,
        rating: Number(rating),
        comment
    });

    return review;
}

async function getProductReviews(productId) {
    return await Review.find({
        productId: Number(productId)
    }).sort({
        createdAt: -1
    });
}

module.exports = {
    createReview,
    getProductReviews
};