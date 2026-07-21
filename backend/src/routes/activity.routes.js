const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/admin.middleware");
const activityController = require("../controllers/activity.controller");

router.get(
    "/",
    authenticate,
    authorizeAdmin,
    activityController.getActivities
);

module.exports = router;