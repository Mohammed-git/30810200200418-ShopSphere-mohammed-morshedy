const ActivityLog = require("../models/ActivityLog");

async function logActivity(action, productId, userId) {
    await ActivityLog.create({
        action,
        productId,
        userId
    });
}

module.exports = {
    logActivity
};
async function getActivities() {
    return await ActivityLog.find().sort({ createdAt: -1 });
}

module.exports = {
    logActivity,
    getActivities
};