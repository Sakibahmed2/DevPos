import { Router } from "express";
import { purchaseControllers } from "../controllers/purchaseControllers.js";

const router = Router();

router.post(
  "/create-payment-intent",
  purchaseControllers.createPurchasePaymentIntent
);

router.post("/create", purchaseControllers.createPurchase);

router.get("/", purchaseControllers.getAllPurchase);

router.get("/:id", purchaseControllers.getSinglePurchase);

router.put("/:id", purchaseControllers.updatePurchase);

router.delete("/:id", purchaseControllers.deletePurchase);

export const purchaseRouter = router;
