// import request from "supertest";
// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import messageRoutes from "../routes/v1/messages";
// import { authenticateToken } from "../middleware/auth";

// // Initialize express app for testing
// const app = express();
// app.use(bodyParser.json());
// app.use("/api/messages", authenticateToken, messageRoutes);

// // Connect to MongoDB in-memory database for testing
// beforeAll(async () => {
//   const mongoUri = "mongodb://localhost:27017/testdb";
//   await mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// // Clear test database before each test
// beforeEach(async () => {
//   await mongoose.connection.db.dropDatabase();
// });

// // Close database connection after all tests
// afterAll(async () => {
//   await mongoose.connection.close();
// });

// const mockToken = "your-valid-jwt-token";

// // Tests
// describe("Message Routes", () => {
//   it("should create a new message", async () => {
//     const response = await request(app)
//       .post("/api/messages")
//       .set("Authorization", `Bearer ${mockToken}`)
//       .send({
//         type: "text",
//         content: "Test message",
//         userId: "60d0fe4f5311236168a109ca",
//       });
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("type", "text");
//     expect(response.body).toHaveProperty("content", "Test message");
//   });

//   it("should get all messages", async () => {
//     await request(app)
//       .post("/api/messages")
//       .set("Authorization", `Bearer ${mockToken}`)
//       .send({
//         type: "text",
//         content: "Test message",
//         userId: "60d0fe4f5311236168a109ca",
//       });

//     const response = await request(app)
//       .get("/api/messages")
//       .set("Authorization", `Bearer ${mockToken}`);
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBeGreaterThan(0);
//   });

//   it("should delete a message (admin only)", async () => {
//     const messageResponse = await request(app)
//       .post("/api/messages")
//       .set("Authorization", `Bearer ${mockToken}`)
//       .send({
//         type: "text",
//         content: "Test message to delete",
//         userId: "60d0fe4f5311236168a109ca",
//       });

//     const messageId = messageResponse.body._id;

//     const deleteResponse = await request(app)
//       .delete(`/api/messages/${messageId}`)
//       .set("Authorization", `Bearer ${mockToken}`);
//     expect(deleteResponse.status).toBe(200);
//     expect(deleteResponse.text).toBe("Message deleted");
//   });
// });
