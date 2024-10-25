import QueryBuilder from "../builder/QueryBuilder.js";
import { VariantAttributes } from "../models/variantAttributesModel.js";
import sendResponse from "../utils/sendResponse.js";

const createVariantAttributes = async (req, res, next) => {
  try {
    const variantAttributesData = req.body;

    const result = await VariantAttributes.create(variantAttributesData);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Variant Attributes created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllVariantAttributes = async (req, res, next) => {
  try {
    const variantAttributesQuery = new QueryBuilder(
      VariantAttributes.find(),
      req.query
    )
      .search(["name", "value"])
      .filter()
      .sort()
      .paginate();

    const result = await variantAttributesQuery.moduleQuery;
    const meta = await variantAttributesQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All Variant Attributes",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleVariantAttributes = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await VariantAttributes.findById(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Single Variant Attributes",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateVariantAttributes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const variantAttributesData = req.body;

    const result = await VariantAttributes.findByIdAndUpdate(
      id,
      variantAttributesData,
      {
        new: true,
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Variant Attributes updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteVariantAttributes = async (req, res, next) => {
  try {
    const { id } = req.params;

    await VariantAttributes.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Variant Attributes deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const variantAttributesControllers = {
  createVariantAttributes,
  getAllVariantAttributes,
  getSingleVariantAttributes,
  updateVariantAttributes,
  deleteVariantAttributes,
};
