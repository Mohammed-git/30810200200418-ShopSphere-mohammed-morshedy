const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger'); // 1. استدعاء الـ logger

const orderRoutes = require("./routes/order.routes");
const authRoutes = require('./routes/auth.routes'); 
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes"); 
const authenticate = require("./middleware/auth.middleware");
const authorizeAdmin = require("./middleware/admin.middleware");
const userRoutes = require("./routes/user.routes");
const statsRoutes = require("./routes/stats.routes");
const reviewRoutes = require("./routes/review.routes");
const activityRoutes = require("./routes/activity.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 2. Middleware تسجيل الـ Requests (بيتحط فوق قبل أي Route)
app.use((req, res, next) => {
  logger.info({
    message: 'Incoming Request',
    method: req.method,
    url: req.url,
    status: res.statusCode
  });
  next();
});

// الـ Routes بتاعتك
app.use("/api/stats", statsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);

app.get("/api/profile", authenticate, (req, res) => {
    res.json({
        message: "Welcome",
        user: req.user
    });
});

app.get("/api/admin", authenticate, authorizeAdmin, (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
});

app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

// 3. Middleware تسجيل الـ Errors (لازم يكون في آخخخخر الملف بعد كل الـ Routes)
app.use((err, req, res, next) => {
  logger.error({
    message: err.message || 'Internal Server Error',
    stack: err.stack,
    url: req.url
  });
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;