const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes'); 

const app = express();
const authenticate = require("./middleware/auth.middleware");

app.get("/api/profile", authenticate, (req, res) => {

    res.json({
        message: "Welcome",
        user: req.user
    });

});
const authorizeAdmin = require("./middleware/admin.middleware");

app.get(
    "/api/admin",
    authenticate,
    authorizeAdmin,
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });

    }
);

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

module.exports = app;