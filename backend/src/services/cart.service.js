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

    const existingItem = await prisma.cart.findFirst({
        where: {
            userId,
            productId: Number(productId)
        }
    });

    if (existingItem) {

        return await prisma.cart.update({
            where: {
                id: existingItem.id
            },
            data: {
                quantity: existingItem.quantity + Number(quantity)
            }
        });

    }

    return await prisma.cart.create({
        data: {
            userId,
            productId: Number(productId),
            quantity: Number(quantity)
        }
    });

}

async function getCart(userId) {

    const items = await prisma.cart.findMany({

    where: {
        userId
    },

    include: {
        product: true
    },

    orderBy: {
        id: "asc"
    }

});

    const total = items.reduce((sum, item) => {

        return sum + item.quantity * item.product.price;

    }, 0);

    return {
        items,
        total
    };

}

async function updateQuantity(userId, cartId, quantity) {

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

    return await prisma.cart.update({

        where: {
            id: Number(cartId)
        },

        data: {
            quantity: Number(quantity)
        }

    });

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
    updateQuantity,
    removeFromCart
};