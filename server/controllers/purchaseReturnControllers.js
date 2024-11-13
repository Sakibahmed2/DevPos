import QueryBuilder from "../builder/QueryBuilder.js";
import { PurchaseReturn } from "../models/purchaseReturnModel.js";
import sendResponse from "../utils/sendResponse.js";

const createPurchaseReturn = async (req, res, next) => {
  try {
    const purchaseReturnData = req.body;

    if (purchaseReturnData?.status === "Received") {
      purchaseReturnData.paymentTypeStatus = "Paid";
    } else if (purchaseReturnData?.status === "Refunded") {
      purchaseReturnData.paymentTypeStatus = "Partial";
    }

    purchaseReturnData.refNo = `REF${Math.random()
      .toString()
      .substr(2, 6)
      .toUpperCase()}`;

    const result = await PurchaseReturn.create(purchaseReturnData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Purchase return created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPurchaseReturn = async (req, res, next) => {
  try {
    const purchaseReturnQuery = new QueryBuilder(
      PurchaseReturn.find().populate(
        "products",
        "name img pricingAndStock.price pricingAndStock.quantity productInfo.category productInfo.stockKeepingUnit productInfo.brand"
      ),
      req.query
    )
      .search(["status", "paymentTypeStatus", "supplierName"])
      .filter()
      .sort()
      .paginate();

    const result = await purchaseReturnQuery.moduleQuery;
    const meta = await purchaseReturnQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All purchase return",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSinglePurchaseReturn = async (req, res, next) => {
  try {
    const result = await PurchaseReturn.findById(req.params.id).populate(
      "products",
      "name img pricingAndStock.price pricingAndStock.quantity productInfo.category productInfo.stockKeepingUnit productInfo.brand"
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single purchase return",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updatePurchaseReturn = async (req, res, next) => {
  try {
    const purchaseReturnData = req.body;

    if (purchaseReturnData?.status === "Received") {
      purchaseReturnData.paymentTypeStatus = "Paid";
    } else if (purchaseReturnData?.status === "Refunded") {
      purchaseReturnData.paymentTypeStatus = "Partial";
    }

    const result = await PurchaseReturn.findByIdAndUpdate(
      req.params.id,
      purchaseReturnData,
      {
        new: true,
      }
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Purchase return updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deletePurchaseReturn = async (req, res, next) => {
  try {
    await PurchaseReturn.findByIdAndDelete(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Purchase return deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const purchaseReturnControllers = {
  createPurchaseReturn,
  getAllPurchaseReturn,
  getSinglePurchaseReturn,
  updatePurchaseReturn,
  deletePurchaseReturn,
};
