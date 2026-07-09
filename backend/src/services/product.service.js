const prisma = require("../config/prisma");


async function createProduct(productData) {
    const {
        name,
        description,
        price,
        category,
        stock,
        image
    } = productData;

    if (!name || !description || !price || !category || !stock) {
        throw new Error("All fields are required");
    }

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price: Number(price),
            category,
            stock: Number(stock),
            image
        }
    });

    return product;
}


async function getAllProducts(query) {
    const {
        search,
        category,
        sort,
        page = 1,
        limit = 10
    } = query;

    const where = {};

    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive"
        };
    }

    if (category) {
        where.category = category;
    }

    const orderBy = {};

    if (sort === "price_asc") {
        orderBy.price = "asc";
    } else if (sort === "price_desc") {
        orderBy.price = "desc";
    } else {
        orderBy.createdAt = "desc";
    }

    const products = await prisma.product.findMany({
        where,
        orderBy,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit)
    });

    return products;
}


async function getProductById(id) {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
}
async function updateProduct(id, productData) {

    const product = await prisma.product.update({

        where: {
            id: Number(id)
        },

        data: productData

    });

    return product;

}

async function deleteProduct(id) {

    await prisma.product.delete({

        where: {
            id: Number(id)
        }

    });

}

module.exports = {

    createProduct,

    getAllProducts,

    getProductById,

    updateProduct,

    deleteProduct

};