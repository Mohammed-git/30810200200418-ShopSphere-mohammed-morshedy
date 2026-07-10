const express = require('express');
const cors = require('cors');

// 1️⃣ استدعاء الـ Routes والـ Middlewares كلها فوق في أمان
const authRoutes = require('./routes/auth.routes'); 
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes"); // جبناها فوق هنا
const authenticate = require("./middleware/auth.middleware");
const authorizeAdmin = require("./middleware/admin.middleware");

const app = express();

// 2️⃣ الـ Middlewares الأساسية (حجر الأساس قبل أي Route)
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 3️⃣ الـ Routes بتاعة المشروع كلها تحت بعضها
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); // حطيناها هنا بعد ما المكاتب اتفعلت

// الـ Route المؤقت للـ Profile
app.get("/api/profile", authenticate, (req, res) => {
    res.json({
        message: "Welcome",
        user: req.user
    });
});

// الـ Route المؤقت للـ Admin
app.get("/api/admin", authenticate, authorizeAdmin, (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
});

// الـ Route التجريبي الرئيسي
app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

module.exports = app;