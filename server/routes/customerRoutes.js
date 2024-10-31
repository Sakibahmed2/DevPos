import { Router } from "express";
import { customerControllers } from "../controllers/customerControllers.js";

const router = Router();

router.post("/", customerControllers.createCustomer);

router.get("/", customerControllers.getAllCustomers);

router.get("/:id", customerControllers.getSingleCustomers);

router.put("/:id", customerControllers.updateCustomer);

router.delete("/:id", customerControllers.deleteCustomer);

export const customerRouter = router;
