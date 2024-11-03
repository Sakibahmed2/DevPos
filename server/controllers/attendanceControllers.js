import sendResponse from "../utils/sendResponse.js";
import { calculateWorkHours } from "../utils/calculateTimeDifference.js";
import { Attendance } from "../models/attendanceModel.js";
import QueryBuilder from "../builder/QueryBuilder.js";

const createAttendance = async (req, res, next) => {
  try {
    const { checkIn, checkOut } = req.body;

    // Calculate the total work time in hours
    const { totalHours, totalMinutes, overTimeHours, overTimeMinutes } =
      calculateWorkHours(checkIn, checkOut);

    const totalWorkTime = `${totalHours} hours${
      totalMinutes ? ` ${totalMinutes} minutes` : ""
    }`;
    const overTime =
      overTimeHours || overTimeMinutes
        ? `${overTimeHours} hours${
            overTimeMinutes ? ` ${overTimeMinutes} minutes` : ""
          }`
        : null;

    const attendanceData = {
      totalHours: totalWorkTime,
      overTime: overTime,
      ...req.body,
    };

    const result = await Attendance.create(attendanceData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Attendance created successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error creating attendance:", err);
    next(err);
  }
};

const getAllAttendance = async (req, res, next) => {
  try {
    const attendanceQuery = new QueryBuilder(
      Attendance.find().populate({
        path: "employee",
        select: ["firstName", "lastName", "employeeCode"],
        populate: {
          path: "shift",
          select: "name",
        },
      }),
      req.query
    )
      .search([
        "checkIn",
        "checkOut",
        "employee.firstName",
        "employee.lastName",
      ])
      .filter()
      .sort()
      .paginate();

    const result = await attendanceQuery.moduleQuery;
    const meta = await attendanceQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Attendance retrieved successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    console.error("Error retrieving attendance:", err);
    next(err);
  }
};

const getSingleAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id).populate({
      path: "employee",
      select: ["firstName", "lastName", "employeeCode"],
      populate: {
        path: "shift",
        select: "name",
      },
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Attendance retrieved successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Error retrieving attendance:", err);
    next(err);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body;

    const { totalHours, totalMinutes, overTimeHours, overTimeMinutes } =
      calculateWorkHours(checkIn, checkOut);

    const totalWorkTime = `${totalHours} hours${
      totalMinutes ? ` ${totalMinutes} minutes` : ""
    }`;
    const overTime =
      overTimeHours || overTimeMinutes
        ? `${overTimeHours} hours${
            overTimeMinutes ? ` ${overTimeMinutes} minutes` : ""
          }`
        : null;

    const attendanceData = {
      totalHours: totalWorkTime,
      overTime,
      ...req.body,
    };

    const attendance = await Attendance.findByIdAndUpdate(id, attendanceData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Error updating attendance:", err);
    next(err);
  }
};

const updateApproval = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { approved },
      {
        new: true,
      }
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Error updating attendance:", err);
    next(err);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Attendance.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting attendance:", err);
    next(err);
  }
};

export const attendanceControllers = {
  createAttendance,
  getAllAttendance,
  getSingleAttendance,
  updateAttendance,
  deleteAttendance,
  updateApproval,
};
