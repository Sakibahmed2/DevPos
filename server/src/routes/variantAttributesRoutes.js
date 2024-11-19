import { Router } from "express";
import { variantAttributesControllers } from "../controllers/variantAttributesControllers.js";

const router = Router();

router.post("/", variantAttributesControllers.createVariantAttributes);

router.get("/", variantAttributesControllers.getAllVariantAttributes);

router.get("/:id", variantAttributesControllers.getSingleVariantAttributes);

router.put("/:id", variantAttributesControllers.updateVariantAttributes);

router.delete("/:id", variantAttributesControllers.deleteVariantAttributes);

export const variantAttributesRouter = router;
