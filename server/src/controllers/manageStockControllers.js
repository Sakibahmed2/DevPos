import QueryBuilder from "../builder/QueryBuilder.js";
import { MangeStocks } from "../models/manageStockModel.js";
import sendResponse from "../utils/sendResponse.js";

const createManageStock = async (req, res, next) => {
  try {
    const stockData = req.body;

    const result = await MangeStocks.create(stockData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Stock created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllManageStocks = async (req, res, next) => {
  try {
    const manageStockQuery = new QueryBuilder(
      MangeStocks.find()
        .populate("product", ["name", "img"])
        .populate("warehouse", ["name"])
        .populate("shop", ["name"]),
      req.query
    )
      .search(["warehouse.name", "shop.name"])
      .filter()
      .sort()
      .paginate();

    const result = await manageStockQuery.moduleQuery;
    const meta = await manageStockQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stocks fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleManageStock = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await MangeStocks.findById(id)
      .populate("product", ["name", "img"])
      .populate("warehouse", ["name"])
      .populate("shop", ["name"]);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stock fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateManageStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stockData = req.body;

    const result = await MangeStocks.findByIdAndUpdate(id, stockData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stock updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteManageStock = async (req, res, next) => {
  try {
    const { id } = req.params;

    await MangeStocks.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stock deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const manageStockControllers = {
  createManageStock,
  getAllManageStocks,
  getSingleManageStock,
  updateManageStock,
  deleteManageStock,
};
