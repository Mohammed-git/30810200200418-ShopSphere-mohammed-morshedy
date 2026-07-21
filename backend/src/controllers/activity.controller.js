const activityService = require("../services/activity.service");

async function getActivities(req, res) {
    try {
        const logs = await activityService.getActivities();
        res.json(logs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getActivities
};