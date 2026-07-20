const express = require('express');
const cors = require('cors');
const orderRoutes = require("./routes/order.routes");

const authRoutes = require('./routes/auth.routes'); 
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes"); 
const authenticate = require("./middleware/auth.middleware");
const authorizeAdmin = require("./middleware/admin.middleware");

const app = express();
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/user", userRoutes);

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

module.exports = app;