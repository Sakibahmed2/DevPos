import { Router } from "express";
import { categoriesControllers } from "../controllers/categoriesControllers.js";

const router = Router();

router.post("/", categoriesControllers.createCategories);

router.get("/", categoriesControllers.getAllCategories);

router.get("/:id", categoriesControllers.getSingleCategory);

router.put("/:id", categoriesControllers.updateCategory);

router.delete("/:id", categoriesControllers.deleteCategory);

export const categoriesRouter = router;
