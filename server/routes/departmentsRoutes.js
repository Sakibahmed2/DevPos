import { Router } from "express";
import { departmentsControllers } from "../controllers/departmentsControllers.js";

const router = Router();

router.post("/", departmentsControllers.createDepartments);

router.get("/", departmentsControllers.getAllDepartments);

router.get("/:id", departmentsControllers.getSingleDepartments);

router.put("/:id", departmentsControllers.updateDepartments);

router.delete("/:id", departmentsControllers.deleteDepartments);

export const departmentsRouter = router;
