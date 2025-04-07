import express from "express";
import { createMessage, deleteMessage, getAllMessages,approveMessage } from "../controllers/contactController.js";

const router = express.Router();

// Get all contact messages (for display)
router.post("/", createMessage);
router.get("/", getAllMessages);
// Approve a contact message
router.put("/approve/:id", approveMessage);

// Delete a message
router.delete("/:id", deleteMessage);

export default router;
