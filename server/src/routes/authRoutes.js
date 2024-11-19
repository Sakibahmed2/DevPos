import { Router } from "express";
import { authControllers } from "../controllers/authControllers.js";

const router = Router();

router.post("/login", authControllers.loginUser);

export const authRouter = router;
