function validateRegister(data) {

    if (!data.name || !data.email || !data.password) {

        return false;

    }

    return true;

}

module.exports = {
    validateRegister
};