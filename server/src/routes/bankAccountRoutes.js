import { Router } from "express";
import { bankAccountControllers } from "../controllers/bankAccountControllers.js";

const router = Router();

router.post("/", bankAccountControllers.createBankAccount);

router.get("/", bankAccountControllers.getAllBankAccounts);

router.get("/:id", bankAccountControllers.getBankAccount);

router.put("/:id", bankAccountControllers.updateBankAccount);

router.delete("/:id", bankAccountControllers.deleteBankAccount);

export const bankAccountRouter = router;
