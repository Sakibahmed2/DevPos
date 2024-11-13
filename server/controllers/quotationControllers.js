import QueryBuilder from "../builder/QueryBuilder.js";
import { Quotations } from "../models/quotationModel.js";
import sendResponse from "../utils/sendResponse.js";

const createQuotation = async (req, res, next) => {
  try {
    const quotationData = req.body;

    if (!quotationData?.refNo) {
      quotationData.refNo = `REF${Math.random()
        .toString()
        .substr(2, 6)
        .toUpperCase()}`;
    }

    const result = await Quotations.create(quotationData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quotation created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllQuotation = async (req, res, next) => {
  try {
    const quotationQuery = new QueryBuilder(
      Quotations.find().populate(
        "products",
        "name img pricingAndStock.price pricingAndStock.quantity  productInfo.stockKeepingUnit productInfo.brand"
      ),
      req.query
    )
      .search(["customerName"])
      .filter()
      .sort()
      .paginate();

    const result = await quotationQuery.moduleQuery;
    const meta = await quotationQuery.countTotal();

    sendResponse(res, {
      success: true,
      message: "Quotation fetched successfully",
      statusCode: 200,
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleQuotation = async (req, res, next) => {
  try {
    const result = await Quotations.findById(req.params.id).populate(
      "products",
      "name img pricingAndStock.price pricingAndStock.quantity  productInfo.stockKeepingUnit productInfo.brand"
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Quotation fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateQuotation = async (req, res, next) => {
  try {
    const quotationData = req.body;

    const result = await Quotations.findByIdAndUpdate(
      req.params.id,
      quotationData,
      {
        new: true,
        runValidators: true,
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Quotation updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteQuotation = async (req, res, next) => {
  try {
    await Quotations.findByIdAndDelete(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quotation deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const quotationControllers = {
  createQuotation,
  getAllQuotation,
  getSingleQuotation,
  updateQuotation,
  deleteQuotation,
};
