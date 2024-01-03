/*
1. The response status is 200.
2. The response has token.
3. The response must be an object with two fields: email and subscription.
4. The response data type is String. 
*/

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Test the POST/login/user controller", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST);
  });
  const user = {
    password: "123456",
    email: "morico2954@wenkuu.com",
  };
  test("It should return response status 200", async () => {
    const response = await request(app).post("/users/login").send(user);
    expect(response.statusCode).toBe(200);
  });
  test("It should login user and return token", async () => {
    const response = await request(app).post("/users/login").send(user);
    expect(response.body.token).toBeTruthy();
  });
  test("The response should be an object with two fields: email and subscription", async () => {
    const response = await request(app).post("/users/login").send(user);
    expect(response.body.user).toEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
