import { Router } from "express";
import { promoControllers } from "../controllers/promoControllers.js";

const router = Router();

router.post("/", promoControllers.createPromo);

router.get("/", promoControllers.getAllPromos);

router.get("/:id", promoControllers.getSinglePromo);

router.put("/:id", promoControllers.updatePromo);

router.delete("/:id", promoControllers.deletePromo);

export const promoRouter = router;
