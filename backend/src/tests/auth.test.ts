import request from "supertest";
import express from "express";
import authRoutes from "../routes/v1/auth";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.text).toBe("User registered");
  });

  it("should log in a user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
  });
});
