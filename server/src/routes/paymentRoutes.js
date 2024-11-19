import { Router } from "express";
import { paymentControllers } from "../controllers/paymentControllers.js";

const router = Router();

router.post("/create-payment-intent", paymentControllers.createPaymentIntent);

router.post("/create-sale", paymentControllers.createOrder);

router.get("/all-sales", paymentControllers.getAllSales);

router.get("/all-sales/:id", paymentControllers.getSingleSale);

router.put("/update-sale/:id", paymentControllers.updateSale);

router.delete("/delete-sale/:id", paymentControllers.deleteSale);

export const paymentRouter = router;
