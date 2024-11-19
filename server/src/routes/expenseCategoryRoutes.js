import { Router } from "express";
import { expenseCategoryControllers } from "../controllers/expenseCategoryControllers.js";

const router = Router();

router.post("/", expenseCategoryControllers.createExpenseCategory);

router.get("/", expenseCategoryControllers.getAllExpenseCategories);

router.get("/:id", expenseCategoryControllers.getSingleExpenseCategory);

router.put("/:id", expenseCategoryControllers.updateExpenseCategory);

router.delete("/:id", expenseCategoryControllers.deleteExpenseCategory);

export const expenseCategoryRouter = router;
