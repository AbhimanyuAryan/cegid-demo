import express from "express";
import Message from "../../models/Message";
import { authenticateToken } from "../../middleware/auth";
import { authorizeAdmin } from "../../middleware/authorization";

const router = express.Router();

// Use the middleware to protect the routes
router.use(authenticateToken);

/**
 * @openapi
 * /messages:
 *   get:
 *     summary: Retrieve all messages
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                   content:
 *                     type: string
 *                   userId:
 *                     type: string
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 type:
 *                   type: string
 *                 content:
 *                   type: string
 *                 userId:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 * /messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted
 *       404:
 *         description: Message not found
 *     security:
 *       - bearerAuth: []
 */

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const newMessage = new Message({
      ...req.body,
      userId: (req as any).user.userId,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

// Delete a message (only admin users can delete)
router.delete("/:id", authorizeAdmin, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).send("Message deleted");
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

export default router;
