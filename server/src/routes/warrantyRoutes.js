import { Router } from "express";
import { warrantyControllers } from "../controllers/warrantyControllers.js";

const router = Router();

router.post("/", warrantyControllers.createWarranty);

router.get("/", warrantyControllers.getWarranties);

router.get("/:id", warrantyControllers.getSingleWarranty);

router.put("/:id", warrantyControllers.updateWarranty);

router.delete("/:id", warrantyControllers.deleteWarranty);

export const warrantyRouter = router;
