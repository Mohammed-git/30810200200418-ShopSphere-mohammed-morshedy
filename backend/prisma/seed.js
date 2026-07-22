const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {

    // =========================
    // Users
    // =========================

    const adminExists = await prisma.user.findUnique({
        where: {
            email: "mohamed@test.com"
        }
    });

    if (!adminExists) {

        const hashedPassword = await bcrypt.hash("123456", 10);

        await prisma.user.create({
            data: {
                name: "Mohamed",
                email: "mohamed@test.com",
                password: hashedPassword,
                role: "admin"
            }
        });

        console.log("✅ Admin created");

    }

    const customerExists = await prisma.user.findUnique({
        where: {
            email: "ahmed@test.com"
        }
    });

    if (!customerExists) {

        const hashedPassword = await bcrypt.hash("123456", 10);

        await prisma.user.create({
            data: {
                name: "Ahmed",
                email: "ahmed@test.com",
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
      name: "WD Black SN850X",
      description: "High-performance PCIe Gen4 NVMe SSD",
      price: 10500,
      category: "SSD",
      image: "1783713195126-sn850x.jpg",
      stock: 15
    },
    {
      name: "Samsung 990 Pro",
      description: "Samsung PCIe Gen4 NVMe SSD",
      price: 9800,
      category: "SSD",
      image: "1783713132146-990pro.jpg",
      stock: 12
    },
    {
      name: "Kingston Fury DDR5 8GB",
      description: "DDR5 Desktop Memory",
      price: 1700,
      category: "RAM",
      image: "1783713062927-kingston.jpg",
      stock: 30
    },
    {
      name: "Corsair Vengeance DDR5 8GB",
      description: "High-speed DDR5 Memory",
      price: 1800,
      category: "RAM",
      image: "1783713015548-corsair.jpg",
      stock: 30
    },
    {
      name: "Intel Core Ultra 9 Series 2",
      description: "Intel Desktop Processor",
      price: 32000,
      category: "CPU",
      image: "1783712956294-ultra9.jpg",
      stock: 8
    },
    {
      name: "AMD Ryzen 7 9800X3D",
      description: "Gaming Processor",
      price: 29500,
      category: "CPU",
      image: "1783712877758-9800x3d.jfif",
      stock: 10
    },
    {
      name: "AMD Ryzen 9 9950X",
      description: "High-end Desktop Processor",
      price: 36000,
      category: "CPU",
      image: "1783712807613-9950x.avif",
      stock: 6
    },
    {
      name: "NVIDIA GeForce RTX 5090",
      description: "Flagship Gaming Graphics Card",
      price: 200000,
      category: "GPU",
      image: "1783631416950-images.jfif",
      stock: 3
    },
    {
      name: "NVIDIA GeForce RTX 5080",
      description: "High-end Gaming Graphics Card",
      price: 120000,
      category: "GPU",
      image: "1783711531363-5080.jpg",
      stock: 5
    },
    {
      name: "NVIDIA GeForce RTX 5070 Ti",
      description: "Powerful Gaming Graphics Card",
      price: 70000,
      category: "GPU",
      image: "1783712093097-5070ti.jpg",
      stock: 7
    },
    {
      name: "NVIDIA GeForce RTX 4090",
      description: "Previous Generation Flagship GPU",
      price: 95000,
      category: "GPU",
      image: "1783953052376-4090.jpg",
      stock: 4
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