import { Router } from "express";
import { roleControllers } from "../controllers/roleControllers.js";

const router = Router();

router.post("/", roleControllers.createRole);

router.get("/", roleControllers.getAllRole);

router.get("/:id", roleControllers.getSingleRole);

router.put("/:id", roleControllers.updateRole);

router.delete("/:id", roleControllers.deleteRole);

export const roleRouter = router;
