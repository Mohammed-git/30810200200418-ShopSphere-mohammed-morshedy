const app = require("./app");
require("dotenv").config();

const prisma = require("./config/prisma");
const connectMongo = require("./config/mongo");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL connected");

    await connectMongo();

    const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ Listen Error:", err);
});
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}
module.exports = app;
startServer();