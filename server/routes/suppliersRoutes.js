import { Router } from "express";
import { suppliersControllers } from "../controllers/suppliersControllers.js";

const router = Router();

router.post("/", suppliersControllers.createSupplier);

router.get("/", suppliersControllers.getAllSuppliers);

router.get("/:id", suppliersControllers.getSingleSupplier);

router.put("/:id", suppliersControllers.updateSupplier);

router.delete("/:id", suppliersControllers.deleteSupplier);

export const suppliersRouter = router;
