import { Router } from "express";
import { cancleOrder, placeOrder } from "../controller/order.controller.js";

const router = Router();

router.post("/placeOrder", placeOrder);
router.post("/cancle", cancleOrder);

export default router;
