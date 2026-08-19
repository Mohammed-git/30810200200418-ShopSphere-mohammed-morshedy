const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const orderRoutes = require("./routes/order.routes");
const authRoutes = require('./routes/auth.routes'); 
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes"); 
const userRoutes = require("./routes/user.routes");
const statsRoutes = require("./routes/stats.routes");
const reviewRoutes = require("./routes/review.routes");
const activityRoutes = require("./routes/activity.routes");

const authenticate = require("./middleware/auth.middleware");
const authorizeAdmin = require("./middleware/admin.middleware");

const app = express();

// 1. Security Protections (Sub-task 1.3)
app.use(helmet()); // Helmet Protection
app.use(cors());   // CORS Protection

// Rate Limiter: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: "error", message: "Too many requests, please try again later." }
});
app.use(limiter);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 2. Health Check Endpoint (Sub-task 1.4 - Required for UptimeRobot)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

// API Routes
app.use("/api/stats", statsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);

app.get("/api/profile", authenticate, (req, res) => {
    res.json({ message: "Welcome", user: req.user });
});

app.get("/api/admin", authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

module.exports = app;