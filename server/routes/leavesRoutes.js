import { Router } from "express";
import { leavesControllers } from "../controllers/leavesControllers.js";

const router = Router();

router.post("/", leavesControllers.createLeaves);

router.get("/", leavesControllers.getAllLeaves);

router.get("/:id", leavesControllers.getSingleLeave);

router.put("/:id", leavesControllers.updateLeave);

router.patch("/:id/approval", leavesControllers.approveLeave);

router.delete("/:id", leavesControllers.deleteLeave);

export const leavesRouter = router;
