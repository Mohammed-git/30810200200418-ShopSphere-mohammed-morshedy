const userService = require("../services/user.service");

async function getProfile(req, res) {

    try {

        const user = await userService.getProfile(req.user.id);

        res.json(user);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}

async function updateProfile(req, res) {

    try {

        const user = await userService.updateProfile(
            req.user.id,
            req.body
        );

        res.json(user);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}

module.exports = {

    getProfile,

    updateProfile

};