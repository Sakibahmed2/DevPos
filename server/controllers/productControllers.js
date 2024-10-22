import { Products } from "../models/productModel.js";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";

const createProduct = async (req, res, next) => {
  try {
    const productInfo = req.body;
    const result = await Products.create(productInfo);

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
    const result = await Products.find();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All products fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Products.findById(id);

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
