import QueryBuilder from "../builder/QueryBuilder.js";
import { ProductSearchableFields } from "../constant/productConstant.js";
import { Products } from "../models/productModel.js";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";

const createProduct = async (req, res, next) => {
  try {
    const productInfo = req.body;

    const currentDate = new Date();

    const expiryDate = new Date(currentDate);

    expiryDate.setFullYear(currentDate.getFullYear() + 1);

    const productData = {
      ...productInfo,
      expiryDate,
    };

    const result = await Products.create(productData);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const productQuery = new QueryBuilder(
      Products.find().populate("createdBy", "name email img"),
      req.query
    )
      .search(ProductSearchableFields)
      .filter()
      .sort()
      .paginate();

    const result = await productQuery.moduleQuery;
    const meta = await productQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All products fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Products.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!result) {
      throw new AppError(404, "Product not found");
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productInfo = req.body;
    const result = await Products.findByIdAndUpdate(id, productInfo, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Products.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
