import { Router } from "express";
import { userControllers } from "../controllers/userControllers.js";

const router = Router();

router.post("/create-user", userControllers.createUser);

export const userRouter = router;
