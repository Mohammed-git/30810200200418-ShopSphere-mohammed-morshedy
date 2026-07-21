const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/admin.middleware");

const statsController = require("../controllers/stats.controller");

router.get("/", authenticate, authorizeAdmin, statsController.getStats);

module.exports = router;