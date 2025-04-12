import express from "express";

import { createProduce, fetchProduce } from "../controllers/produce.controller.js";

const router = express.Router();

router.post("/add", createProduce)
router.get("/fetch", fetchProduce)

export default router