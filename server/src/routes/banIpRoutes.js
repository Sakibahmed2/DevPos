import { Router } from "express";
import { banIpControllers } from "../controllers/banIpControllers.js";

const router = Router();

router.post("/", banIpControllers.createBanIp);

router.get("/", banIpControllers.getAllBanIp);

router.get("/:id", banIpControllers.getBanIp);

router.put("/:id", banIpControllers.updateBanIp);

router.delete("/:id", banIpControllers.deleteBanIp);

export const banIpRouter = router;
