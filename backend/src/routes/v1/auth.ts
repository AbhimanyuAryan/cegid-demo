import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role || "user"; // Default to 'user' if no role is provided
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).send("User registered");
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("User not found");

    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { username: user.username, userId: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "1h" }
      );
      res.json({ accessToken });
    } else {
      res.status(403).send("Invalid credentials");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

export default router;
