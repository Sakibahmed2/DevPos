import QueryBuilder from "../builder/QueryBuilder.js";
import { Shifts } from "../models/shiftsModel.js";
import sendResponse from "../utils/sendResponse.js";

const createShifts = async (req, res, next) => {
  try {
    const shiftData = req.body;

    const shift = await Shifts.create(shiftData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Shift created successfully",
      data: shift,
    });
  } catch (error) {
    next(error);
  }
};

const getAllShifts = async (req, res, next) => {
  try {
    const shiftQuery = new QueryBuilder(Shifts.find(), req.query)
      .search(["name"])
      .filter()
      .sort()
      .paginate();

    const result = await shiftQuery.moduleQuery;
    const meta = await shiftQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All shifts fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleShift = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Shifts.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Shift fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateShift = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shiftData = req.body;

    const result = await Shifts.findByIdAndUpdate(id, shiftData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Shift updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteShift = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Shifts.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Shift deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const shiftsControllers = {
  createShifts,
  getAllShifts,
  getSingleShift,
  updateShift,
  deleteShift,
};
