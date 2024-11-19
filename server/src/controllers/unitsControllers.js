import QueryBuilder from "../builder/QueryBuilder.js";
import { Units } from "../models/unitsModel.js";
import sendResponse from "../utils/sendResponse.js";

const createUnits = async (req, res, next) => {
  try {
    const newBrand = req.body;

    const result = await Units.create(newBrand);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Units created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUnits = async (req, res, next) => {
  try {
    const unitsQuery = new QueryBuilder(Units.find(), req.query)
      .search(["name"], "name")
      .filter()
      .sort()
      .paginate();

    const result = await unitsQuery.moduleQuery;
    const meta = await unitsQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All units fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Units.findById(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Units fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Units.findByIdAndUpdate(id, update, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Units updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Units.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Unit deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const unitsControllers = {
  createUnits,
  getAllUnits,
  getSingleUnit,
  updateUnit,
  deleteUnit,
};
