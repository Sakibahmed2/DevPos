import { Router } from "express";
import { warehouseControllers } from "../controllers/warehouseControllers.js";

const router = Router();

router.post("/", warehouseControllers.createWarehouse);

router.get("/", warehouseControllers.getAllWarehouses);

router.get("/:id", warehouseControllers.getSingleWarehouse);

router.put("/:id", warehouseControllers.updateWarehouse);

router.delete("/:id", warehouseControllers.deleteWarehouse);

export const warehouseRouter = router;
