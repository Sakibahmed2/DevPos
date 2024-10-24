import QueryBuilder from "../builder/QueryBuilder.js";
import { Brands } from "../models/brandModel.js";
import sendResponse from "../utils/sendResponse.js";

const createBrand = async (req, res, next) => {
  try {
    const newBrand = req.body;

    const result = await Brands.create(newBrand);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Brand created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBrands = async (req, res, next) => {
  try {
    const brandsQuery = new QueryBuilder(Brands.find(), req.query)
      .search(["name"], "name")
      .filter()
      .sort()
      .paginate();

    const result = await brandsQuery.moduleQuery;
    const meta = await brandsQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All brand fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Brands.findById(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Brand fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Brands.findByIdAndUpdate(id, update, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Brand updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Brands.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Brand deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const brandControllers = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
