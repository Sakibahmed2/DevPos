import { Router } from "express";
import { leaveTypesControllers } from "../controllers/leaveTypesControllers.js";

const router = Router();

router.post("/", leaveTypesControllers.createLeaves);

router.get("/", leaveTypesControllers.getAllLeaves);

router.get("/:id", leaveTypesControllers.getSingleLeave);

router.put("/:id", leaveTypesControllers.updateLeave);

router.delete("/:id", leaveTypesControllers.deleteLeave);

export const leaveTypesRouter = router;
