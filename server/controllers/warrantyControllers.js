import QueryBuilder from "../builder/QueryBuilder.js";
import { Warranties } from "../models/warrantyModel.js";
import sendResponse from "../utils/sendResponse.js";

const createWarranty = async (req, res, next) => {
  try {
    const warrantyData = req.body;

    const result = await Warranties.create(warrantyData);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Warranty created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getWarranties = async (req, res, next) => {
  try {
    const warrantyQuery = new QueryBuilder(Warranties.find(), req.query)
      .search(["name", "description"])
      .filter()
      .sort()
      .paginate();

    const result = await warrantyQuery.moduleQuery;
    const meta = await warrantyQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Warranties fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleWarranty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Warranties.findById(id);

    if (!result) {
      return next({
        message: "Warranty not found",
        statusCode: 404,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Warranty fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateWarranty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const warrantyData = req.body;

    const result = await Warranties.findByIdAndUpdate(id, warrantyData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return next({
        message: "Warranty not found",
        statusCode: 404,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Warranty updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteWarranty = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Warranties.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Warranty deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const warrantyControllers = {
  createWarranty,
  getWarranties,
  getSingleWarranty,
  updateWarranty,
  deleteWarranty,
};
