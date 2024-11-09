import { Router } from "express";
import { userControllers } from "../controllers/userControllers.js";

const router = Router();

router.post("/create-user", userControllers.createUser);

router.get("/", userControllers.getAllUsers);

router.get("/:id", userControllers.getSingleUser);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

export const userRouter = router;
