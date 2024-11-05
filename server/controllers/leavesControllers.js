import QueryBuilder from "../builder/QueryBuilder.js";
import { Leaves } from "../models/leavesModel.js";
import calculateDateDifference from "../utils/calculateDateDifference.js";
import sendResponse from "../utils/sendResponse.js";

const createLeaves = async (req, res, next) => {
  try {
    const newLeaveData = req.body;
    const startDate = newLeaveData.startDate;
    const endDate = newLeaveData.endDate;

    // Calculate the difference between the start and end dates
    const { days, hours } = calculateDateDifference(startDate, endDate);

    const newLeaves = {
      ...newLeaveData,
      duration: {
        days,
        hours,
      },
    };

    const result = await Leaves.create(newLeaves);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Leave created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllLeaves = async (req, res, next) => {
  try {
    const leaveQuery = new QueryBuilder(
      Leaves.find()
        .populate({
          path: "employee",
          select: ["firstName", "lastName", "employeeCode"],
          populate: [
            {
              path: "shift",
              select: "name",
            },
            {
              path: "designation",
              select: "name",
            },
          ],
        })
        .populate("leaveType", ["name"]),
      req.query
    )
      .search(["reason", "employee.firstName", "employee.employeeCode"])
      .filter()
      .sort()
      .paginate();

    const result = await leaveQuery.moduleQuery;
    const meta = await leaveQuery.countTotal();

    res.status(200).json({
      success: true,
      message: "Leaves fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Leaves.findById(id)
      .populate({
        path: "employee",
        select: ["firstName", "lastName", "employeeCode"],
        populate: [
          {
            path: "shift",
            select: "name",
          },
          {
            path: "designation",
            select: "name",
          },
        ],
      })
      .populate("leaveType", ["name"]);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leave fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedLeave = req.body;
    const startDate = updatedLeave.startDate;
    const endDate = updatedLeave.endDate;

    // Calculate the difference between the start and end dates
    const { days, hours } = calculateDateDifference(startDate, endDate);

    const newLeaves = {
      ...req.body,
      duration: {
        days,
        hours,
      },
    };

    const result = await Leaves.findByIdAndUpdate(id, newLeaves, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leave updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const approveLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLeave = await Leaves.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leave updated successfully",
      data: updatedLeave,
    });
  } catch (err) {
    next(err);
  }
};

const deleteLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Leaves.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const leavesControllers = {
  createLeaves,
  getAllLeaves,
  getSingleLeave,
  updateLeave,
  approveLeave,
  deleteLeave,
};
