const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {

    // =========================
    // Users
    // =========================

    const adminExists = await prisma.user.findUnique({
        where: {
            email: "admin@test.com"
        }
    });

    if (!adminExists) {

        const hashedPassword = await bcrypt.hash("123456", 10);

        await prisma.user.create({
            data: {
                name: "Admin",
                email: "admin@test.com",
                password: hashedPassword,
                role: "admin"
            }
        });

        console.log("✅ Admin created");

    }

    const customerExists = await prisma.user.findUnique({
        where: {
            email: "customer@test.com"
        }
    });

    if (!customerExists) {

        const hashedPassword = await bcrypt.hash("123456", 10);

        await prisma.user.create({
            data: {
                name: "Customer",
                email: "customer@test.com",
                password: hashedPassword,
                role: "customer"
            }
        });

        console.log("✅ Customer created");

    }

    // =========================
    // Products
    // =========================

    const productsCount = await prisma.product.count();

    if (productsCount === 0) {

        await prisma.product.createMany({

            data: [

                {
                    name: "RTX 5090",
                    description: "NVIDIA GeForce RTX 5090",
                    price: 200000,
                    category: "GPU",
                    stock: 5
                },

                {
                    name: "Ryzen 7 9800X3D",
                    description: "AMD Ryzen 7 Processor",
                    price: 29000,
                    category: "CPU",
                    stock: 10
                },

                {
                    name: "Corsair Vengeance DDR5",
                    description: "32GB DDR5 RAM",
                    price: 7200,
                    category: "RAM",
                    stock: 20
                }

            ]

        });

        console.log("✅ Sample products created");

    } else {

        console.log("ℹ️ Products already exist. Skipping...");

    }

    console.log("🎉 Database Seed Finished");

}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });