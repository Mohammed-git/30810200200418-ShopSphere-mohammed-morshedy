const prisma = require("../config/prisma");

async function createOrder(userId) {

    const cartItems = await prisma.cart.findMany({
        where: {
            userId
        },
        include: {
            product: true
        }
    });

    if (cartItems.length === 0) {
        throw new Error("Cart is empty");
    }

    let total = 0;

    for (const item of cartItems) {
        total += item.product.price * item.quantity;
    }

    const order = await prisma.order.create({
    data: {
        userId,
        totalPrice: total
    }
});
    await prisma.cart.deleteMany({
        where: {
            userId
        }
    });

    return order;
}

module.exports = {
    createOrder
};