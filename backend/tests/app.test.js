const request = require("supertest");
const app = require("../src/app");
const random = Date.now();

const testUser = {
    name: "Test User",
    email: `test${random}@mail.com`,
    password: "123456"
};

describe("API Test", () => {

    test("GET / should return API running", async () => {

        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            message: "API is running"
        });

    });

});
test("GET /api/products should return products", async () => {

    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

});
test("POST /api/auth/register should create new user", async () => {

    const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

    expect(response.statusCode).toBe(201);

});
test("POST /api/auth/login should return token", async () => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: testUser.email,
            password: testUser.password
        });

    expect(response.statusCode).toBe(200);

    expect(response.body.token).toBeDefined();

});