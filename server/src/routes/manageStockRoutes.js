import { Router } from "express";
import { manageStockControllers } from "../controllers/manageStockControllers.js";

const router = Router();

router.post("/", manageStockControllers.createManageStock);

router.get("/", manageStockControllers.getAllManageStocks);

router.get("/:id", manageStockControllers.getSingleManageStock);

router.put("/:id", manageStockControllers.updateManageStock);

router.delete("/:id", manageStockControllers.deleteManageStock);

export const manageStockRouter = router;
