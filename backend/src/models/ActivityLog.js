const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
    {
        action: {
            type: String,
            required: true
        },

        productId: {
            type: Number,
            required: true
        },

        userId: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);