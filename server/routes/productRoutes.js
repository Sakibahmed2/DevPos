import { Router } from "express";
import { productControllers } from "../controllers/productControllers.js";

const router = Router();

router.post("/", productControllers.createProduct);

router.get("/", productControllers.getAllProducts);

router.get("/:id", productControllers.getSingleProduct);

router.put("/:id", productControllers.updateProduct);

router.delete("/:id", productControllers.deleteProduct);

export const productRouter = router;
