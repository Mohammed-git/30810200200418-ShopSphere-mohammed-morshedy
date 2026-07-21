const prisma = require("../config/prisma");

async function getStoreStats() {
    const users = await prisma.user.count();
    const products = await prisma.product.count();
    const orders = await prisma.order.count();

    const revenue = await prisma.order.aggregate({
        _sum: {
            totalPrice: true
        }
    });

    return {
        users,
        products,
        orders,
        revenue: revenue._sum.totalPrice || 0
    };
}

module.exports = {
    getStoreStats
};