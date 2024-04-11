import { Router } from "express";
import { registerUser, signin, getAllUserData, deleteUser } from "../controller/user.controller.js";
import { upload } from '../middleware/multer.middleware.js'
const router = Router();

router.post("/signup", upload.single("avtar"), registerUser); //if you want to upload only one file the use upload.single()
//agar 1 bar me 1 se jyada file upload krni hai form me to use upload.fields               
router.post("/signin", signin);
router.get("/", getAllUserData);
router.delete('/:id', deleteUser)

export default router;
