import { Router } from "express";
import { shiftsControllers } from "../controllers/shiftsControllers.js";

const router = Router();

router.get("/", shiftsControllers.createShifts);

router.get("/", shiftsControllers.getAllShifts);

router.get("/:id", shiftsControllers.getSingleShift);

router.put("/:id", shiftsControllers.updateShift);

router.delete("/:id", shiftsControllers.deleteShift);

export const shiftsRouter = router;
