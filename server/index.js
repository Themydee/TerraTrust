import express from "express";
import dotenv from "dotenv";
import { DB } from "./db/connect.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors"


dotenv.config();
const app = express();  
const PORT = process.env.PORT || 5000;

app.use(express.json());app.use(cors({
    origin: "http://localhost:8080", // your frontend origin
    credentials: true, // allow cookies
    methods: [ "GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
  
app.use(express.json()); 
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
