import { Router } from "express";
import { quotationControllers } from "../controllers/quotationControllers.js";

const router = Router();

router.post("/", quotationControllers.createQuotation);

router.get("/", quotationControllers.getAllQuotation);

router.get("/:id", quotationControllers.getSingleQuotation);

router.put("/:id", quotationControllers.updateQuotation);

router.delete("/:id", quotationControllers.deleteQuotation);

export const quotationRouter = router;
