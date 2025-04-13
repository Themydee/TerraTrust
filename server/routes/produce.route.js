import express from "express";

import { createProduce, fetchProduce, updateProduce, deleteProduce} from "../controllers/produce.controller.js";

const router = express.Router();

router.post("/add", createProduce)
router.get("/fetch", fetchProduce)
router.put("/update/:id", updateProduce)
router.delete("/delete/:id", deleteProduce)


export default router