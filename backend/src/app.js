const express = require('express');
const cors = require('cors');

const app = express();

// تفعيل الـ CORS وقراءة الـ JSON
app.use(cors());
app.use(express.json());

// الـ Route التجريبي
app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

module.exports = app;