const statsService = require("../services/stats.service");

async function getStats(req, res) {
    try {
        const stats = await statsService.getStoreStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getStats
};