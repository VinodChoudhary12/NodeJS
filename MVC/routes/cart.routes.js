import { Router } from "express";
import {
    addItemInCart,
    decreseQuintity,
    getProductInCart,
    increseQuintity,
} from "../controller/cart.controller.js";
const router = Router();

router.post("/increse-quintity", increseQuintity);
router.post("/decrese-quintity", decreseQuintity);
router.post("/addCart-item", addItemInCart);
router.get("/get-cart-data/:id", getProductInCart);

export default router;
