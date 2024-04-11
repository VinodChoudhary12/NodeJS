import { Router } from "express";
import { getCategory, saveInBulk } from "../controller/category.controller.js";

const router = Router();

router.post("/save-in-bulk", saveInBulk);
router.get("/list", getCategory);
export default router;
