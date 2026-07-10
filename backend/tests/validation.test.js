const { validateRegister } = require("../src/utils/validation");

describe("Register Validation", () => {

    test("Should return true when all fields exist", () => {

        expect(
            validateRegister({
                name: "Mohamed",
                email: "m@test.com",
                password: "123456"
            })
        ).toBe(true);

    });

    test("Should return false when name is missing", () => {

        expect(
            validateRegister({
                email: "m@test.com",
                password: "123456"
            })
        ).toBe(false);

    });

    test("Should return false when email is missing", () => {

        expect(
            validateRegister({
                name: "Mohamed",
                password: "123456"
            })
        ).toBe(false);

    });

    test("Should return false when password is missing", () => {

        expect(
            validateRegister({
                name: "Mohamed",
                email: "m@test.com"
            })
        ).toBe(false);

    });

});