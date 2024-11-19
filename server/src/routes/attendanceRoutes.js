import { Router } from "express";
import { attendanceControllers } from "../controllers/attendanceControllers.js";

const router = Router();

router.post("/", attendanceControllers.createAttendance);

router.get("/", attendanceControllers.getAllAttendance);

router.get("/:id", attendanceControllers.getSingleAttendance);

router.put("/:id", attendanceControllers.updateAttendance);

router.put("/:id/approval", attendanceControllers.updateApproval);

router.delete("/:id", attendanceControllers.deleteAttendance);

export const attendanceRouter = router;
