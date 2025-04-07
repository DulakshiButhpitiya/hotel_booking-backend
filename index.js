import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import categoryRouter from "./routes/categoryRoutes.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";
import contactUsRouter from "./routes/contactUs.js"; // Import the contactUs router
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from "uploads" directory
app.use("/api/gallery/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Failed to connect to database"));

// JWT Middleware
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log('**** Token ****', token);
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded) req.user = decoded;
            next();
        });
    } else {
        next();
    }
});

// Routers
app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/booking", bookingRouter);
app.use('/api/contact', contactUsRouter); // Add this line to include the contactUs router

// Start Server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
