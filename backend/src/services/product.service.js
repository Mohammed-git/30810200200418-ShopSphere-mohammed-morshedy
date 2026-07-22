const prisma = require("../config/prisma");
const activityService = require("./activity.service");

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

    await activityService.logActivity(
        "CREATE_PRODUCT",
        product.id,
        null
    );

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

        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        ];

    }

    if (category) {
        where.category = category;
    }

    const orderBy = {};

    if (sort === "price_asc") {

        orderBy.price = "asc";

    } else if (sort === "price_desc") {

        orderBy.price = "desc";

    } else if (sort === "name_asc") {

        orderBy.name = "asc";

    } else if (sort === "name_desc") {

        orderBy.name = "desc";

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

    const updatedData = {
        ...productData
    };

    if (updatedData.price !== undefined) {
        updatedData.price = Number(updatedData.price);
    }

    if (updatedData.stock !== undefined) {
        updatedData.stock = Number(updatedData.stock);
    }

    const product = await prisma.product.update({

        where: {
            id: Number(id)
        },

        data: updatedData

    });

    await activityService.logActivity(
        "UPDATE_PRODUCT",
        product.id,
        null
    );

    return product;

}
async function deleteProduct(id) {

    await activityService.logActivity(
        "DELETE_PRODUCT",
        Number(id),
        null
    );

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