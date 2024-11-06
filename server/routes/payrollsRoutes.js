import { Router } from "express";
import { payrollsControllers } from "../controllers/payrollsControllers.js";

const router = Router();

router.post("/", payrollsControllers.createPayrolls);

router.get("/", payrollsControllers.getAllPayrolls);

router.get("/:id", payrollsControllers.getSinglePayroll);

router.put("/:id", payrollsControllers.updatePayroll);

router.delete("/:id", payrollsControllers.deletePayroll);

export const payrollsRouter = router;
