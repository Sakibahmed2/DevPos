import { Router } from "express";
import { salesReturnControllers } from "../controllers/salesReturnControllers.js";

const router = Router();

router.post("/", salesReturnControllers.createSalesReturn);

router.get("/", salesReturnControllers.getAllSaleReturn);

router.get("/:id", salesReturnControllers.getSingleSaleReturn);

router.patch("/:id", salesReturnControllers.updateSaleReturn);

router.delete("/:id", salesReturnControllers.deleteSaleReturn);

export const salesReturnRouter = router;
