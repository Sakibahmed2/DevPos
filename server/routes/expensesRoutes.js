import { Router } from "express";
import { expensesControllers } from "../controllers/expensesControllers.js";

const router = Router();

router.post("/", expensesControllers.createExpenses);

router.get("/", expensesControllers.getAllExpenses);

router.get("/:id", expensesControllers.getSingleExpanses);

router.put("/:id", expensesControllers.updateExpanses);

router.delete("/:id", expensesControllers.deleteExpanses);

export const expanseRouter = router;
