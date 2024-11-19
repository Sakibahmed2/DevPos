import QueryBuilder from "../builder/QueryBuilder.js";
import { LeaveTypes } from "../models/leaveTypesModel.js";
import sendResponse from "../utils/sendResponse.js";

const createLeaves = async (req, res, next) => {
  try {
    const leaveData = req.body;

    const result = await LeaveTypes.create(leaveData);
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
    const leaveQuery = new QueryBuilder(LeaveTypes.find(), req.query)
      .search(["name", "quote"])
      .filter()
      .sort()
      .paginate();

    const result = await leaveQuery.moduleQuery;
    const meta = await leaveQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
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
    const result = await LeaveTypes.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leave fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const leaveData = req.body;

    const result = await LeaveTypes.findByIdAndUpdate(id, leaveData, {
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

const deleteLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    await LeaveTypes.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const leaveTypesControllers = {
  createLeaves,
  getAllLeaves,
  getSingleLeave,
  updateLeave,
  deleteLeave,
};
