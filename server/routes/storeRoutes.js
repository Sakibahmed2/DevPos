import { Router } from "express";
import { storeControllers } from "../controllers/storeControllers.js";

const router = Router();

router.post("/", storeControllers.createStore);

router.get("/", storeControllers.getAllStores);

router.get("/:id", storeControllers.getSingleStore);

router.put("/:id", storeControllers.updateStore);

router.delete("/:id", storeControllers.deleteStore);

export const storeRouter = router;
