import QueryBuilder from "../builder/QueryBuilder.js";
import { StockTransfers } from "../models/stockTransferModel.js";
import sendResponse from "../utils/sendResponse.js";

const createStockTransfer = async (req, res, next) => {
  try {
    const stockTransfer = await StockTransfers.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Stock transfer created successfully",
      data: stockTransfer,
    });
  } catch (error) {
    next(error);
  }
};

const getStockAllTransfer = async (req, res, next) => {
  try {
    const stockTransfer = new QueryBuilder(StockTransfers.find(), req.query)
      .search(["from", "to", "refNo"])
      .filter()
      .sort()
      .paginate();

    const result = await stockTransfer.moduleQuery;
    const meta = await stockTransfer.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stock transfers fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getStockSingleTransfer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const stockTransfer = await StockTransfers.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stock transfer fetched successfully",
      data: stockTransfer,
    });
  } catch (error) {
    next(error);
  }
};

const updateStockTransfer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const stockTransfer = req.body;

    const result = await StockTransfers.findByIdAndUpdate(id, stockTransfer, {
      new: true,
      runValidators: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stock transfer updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStockTransfer = async (req, res, next) => {
  try {
    const { id } = req.params;

    await StockTransfers.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stock transfer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const stockTransferControllers = {
  createStockTransfer,
  updateStockTransfer,
  deleteStockTransfer,
  getStockAllTransfer,
  getStockSingleTransfer,
};
