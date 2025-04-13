import express from "express";

import { createProduce, fetchProduce, updateProduce, deleteProduce, updateProduceStatus} from "../controllers/produce.controller.js";

const router = express.Router();

router.post("/add", createProduce)
router.get("/fetch", fetchProduce)
router.put("/update/:id", updateProduce)
router.delete("/delete/:id", deleteProduce)
router.patch("/status/:id", updateProduceStatus);

export default router