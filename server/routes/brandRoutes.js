import { Router } from "express";
import { brandControllers } from "../controllers/brandControllers.js";

const router = Router();

router.post("/", brandControllers.createBrand);

router.get("/", brandControllers.getAllBrands);

router.get("/:id", brandControllers.getSingleBrand);

router.put("/:id", brandControllers.updateBrand);

router.delete("/:id", brandControllers.deleteBrand);

export const brandRouter = router;
