import { Router } from "express";
import { designationControllers } from "../controllers/designationControllers.js";

const router = Router();

router.post("/", designationControllers.createDesignations);

router.get("/", designationControllers.getAllDesignations);

router.get("/:id", designationControllers.getSingleDesignations);

router.put("/:id", designationControllers.updateDesignations);

router.delete("/:id", designationControllers.deleteDesignations);

export const designationRouter = router;
