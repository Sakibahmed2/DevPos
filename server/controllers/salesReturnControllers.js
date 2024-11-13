import QueryBuilder from "../builder/QueryBuilder.js";
import { SalesReturn } from "../models/salesReturnModel.js";
import sendResponse from "../utils/sendResponse.js";

const createSalesReturn = async (req, res, next) => {
  try {
    const saleReturnData = req.body;

    if (saleReturnData?.status === "Received") {
      saleReturnData.paymentTypeStatus = "Paid";
    } else if (saleReturnData?.status === "Refunded") {
      saleReturnData.paymentTypeStatus = "Partial";
    }

    if (!saleReturnData.refNo) {
      saleReturnData.refNo = `REF${Math.random()
        .toString()
        .substr(2, 6)
        .toUpperCase()}`;
    }

    const result = await SalesReturn.create(saleReturnData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Sales return created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSaleReturn = async (req, res, next) => {
  try {
    const saleReturnQuery = new QueryBuilder(
      SalesReturn.find().populate(
        "products",
        "name img pricingAndStock.price pricingAndStock.quantity productInfo.category productInfo.stockKeepingUnit productInfo.brand"
      ),
      req.query
    )
      .search(["status", "paymentTypeStatus", "customerName"])
      .filter()
      .sort()
      .paginate();

    const result = await saleReturnQuery.moduleQuery;
    const meta = await saleReturnQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All sales return",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleSaleReturn = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await SalesReturn.findById(id).populate(
      "products",
      "name img pricingAndStock.price pricingAndStock.quantity productInfo.category productInfo.stockKeepingUnit productInfo.brand"
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single sales return",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateSaleReturn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleReturnData = req.body;

    if (saleReturnData?.status === "Received") {
      saleReturnData.paymentTypeStatus = "Paid";
    } else if (saleReturnData?.status === "Refunded") {
      saleReturnData.paymentTypeStatus = "Partial";
    }

    const result = await SalesReturn.findByIdAndUpdate(id, saleReturnData, {
      new: true,
      runValidators: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sales return updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSaleReturn = async (req, res, next) => {
  try {
    const { id } = req.params;

    await SalesReturn.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sales return deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const salesReturnControllers = {
  createSalesReturn,
  getAllSaleReturn,
  getSingleSaleReturn,
  updateSaleReturn,
  deleteSaleReturn,
};
