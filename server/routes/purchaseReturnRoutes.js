import { Router } from "express";
import { purchaseReturnControllers } from "../controllers/purchaseReturnControllers.js";

const router = Router();

router.post("/", purchaseReturnControllers.createPurchaseReturn);

router.get("/", purchaseReturnControllers.getAllPurchaseReturn);

router.get("/:id", purchaseReturnControllers.getSinglePurchaseReturn);

router.put("/:id", purchaseReturnControllers.updatePurchaseReturn);

router.delete("/:id", purchaseReturnControllers.deletePurchaseReturn);

export const purchaseReturnRouter = router;
