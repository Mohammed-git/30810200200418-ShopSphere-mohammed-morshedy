const prisma = require("../config/prisma");

async function getProfile(id) {

    const user = await prisma.user.findUnique({

        where: {
            id: Number(id)
        },

        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }

    });

    if (!user) {

        throw new Error("User not found");

    }

    return user;

}

async function updateProfile(id, userData) {

    const { name, email } = userData;

    if (!name || !email) {

        throw new Error("Name and email are required");

    }

    const existingUser = await prisma.user.findFirst({

        where: {

            email,

            NOT: {
                id: Number(id)
            }

        }

    });

    if (existingUser) {

        throw new Error("Email already exists");

    }

    const user = await prisma.user.update({

        where: {
            id: Number(id)
        },

        data: {
            name,
            email
        },

        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }

    });

    return user;

}

module.exports = {

    getProfile,

    updateProfile

};