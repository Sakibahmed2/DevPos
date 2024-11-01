import { Router } from "express";
import { employeesControllers } from "../controllers/employeesControllers.js";

const router = Router();

router.post("/", employeesControllers.createEmployees);

router.get("/", employeesControllers.getAllEmployees);

router.get("/:id", employeesControllers.getSingleEmployees);

router.put("/:id", employeesControllers.updateEmployee);

router.delete("/:id", employeesControllers.deleteEmployee);

export const employeesRouter = router;
