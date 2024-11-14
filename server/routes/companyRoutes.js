import { Router } from "express";
import { companyControllers } from "../controllers/companyControllers.js";

const router = Router();

router.post("/", companyControllers.createCompany);

router.get("/:id", companyControllers.getSingleCompany);

router.patch("/:id", companyControllers.updateCompany);

export const companyRouter = router;
