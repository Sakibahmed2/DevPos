import { Router } from "express";
import { unitsControllers } from "../controllers/unitsControllers.js";

const router = Router();

router.post("/", unitsControllers.createUnits);

router.get("/", unitsControllers.getAllUnits);

router.get("/:id", unitsControllers.getSingleUnit);

router.put("/:id", unitsControllers.updateUnit);

router.delete("/:id", unitsControllers.deleteUnit);

export const unitsRouter = router;
