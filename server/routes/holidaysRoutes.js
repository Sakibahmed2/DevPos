import { Router } from "express";
import { holidaysControllers } from "../controllers/holidaysControllers.js";

const router = Router();

router.post("/", holidaysControllers.createHolidays);

router.get("/", holidaysControllers.getAllHolidays);

router.get("/:id", holidaysControllers.getSingleHolidays);

router.put("/:id", holidaysControllers.updateHolidays);

router.delete("/:id", holidaysControllers.deleteHolidays);

export const holidaysRouter = router;
