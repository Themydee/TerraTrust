import express from "express";
import dotenv from "dotenv";
import { DB } from "./db/connect.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();
const app = express();  
const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
    DB();
    console.log("Server is running on port:", PORT);
});
