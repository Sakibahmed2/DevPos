import { Router } from "express";
import { stockTransferControllers } from "../controllers/stockTransferControllers.js";

const router = Router();

router.post("/", stockTransferControllers.createStockTransfer);

router.get("/", stockTransferControllers.getStockAllTransfer);

router.get("/:id", stockTransferControllers.getStockSingleTransfer);

router.put("/:id", stockTransferControllers.updateStockTransfer);

router.delete("/:id", stockTransferControllers.deleteStockTransfer);

export const stockTransferRouter = router;
