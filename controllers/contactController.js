import Contact from "../model/contact.js";

// Create a new contact message
export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Contact({ name, email, phone, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

// Get all contact messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};

// Delete a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message", error: error.message });
  }
};

// Approve message
export const approveMessage = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updated = await Contact.findByIdAndUpdate(
        id,
        { approved: true },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Message not found" });
      }
  
      res.json({ message: "Feedback approved", updated });
    } catch (error) {
      res.status(500).json({ message: "Error approving feedback", error: error.message });
    }
  };
  
