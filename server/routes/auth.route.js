import express from "express";
import {  signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login)

// router.post("/logout", logout)

export default router;

// Agricultural Supply Chain{" "}
//                 <span className="text-primary">Transparency</span> with Blockchain