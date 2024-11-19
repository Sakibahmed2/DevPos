import { Router } from "express";
import { subCategoryControllers } from "../controllers/subCategoryControllers.js";

const router = Router();

router.post("/", subCategoryControllers.createCategory);

router.get("/", subCategoryControllers.getAllCategory);

router.get("/:id", subCategoryControllers.getSingleCategory);

router.put("/:id", subCategoryControllers.updateCategory);

router.delete("/:id", subCategoryControllers.deleteCategory);

export const subCategoryRouter = router;
