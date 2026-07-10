const prisma = require("../config/prisma");

async function addToCart(userId, productId, quantity = 1) {

    const product = await prisma.product.findUnique({
        where: {
            id: Number(productId)
        }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const cartItem = await prisma.cart.create({
        data: {
            userId,
            productId: Number(productId),
            quantity: Number(quantity)
        }
    });

    return cartItem;
}
async function getCart(userId) {

    const cart = await prisma.cart.findMany({

        where: {
            userId
        },

        include: {
            product: true
        }

    });

    return cart;
}
async function removeFromCart(userId, cartId) {

    const cartItem = await prisma.cart.findUnique({
        where: {
            id: Number(cartId)
        }
    });

    if (!cartItem) {
        throw new Error("Cart item not found");
    }

    if (cartItem.userId !== userId) {
        throw new Error("Unauthorized");
    }

    await prisma.cart.delete({
        where: {
            id: Number(cartId)
        }
    });

    return {
        message: "Item removed from cart"
    };
}
module.exports = {
    addToCart,
    getCart,
    removeFromCart
};