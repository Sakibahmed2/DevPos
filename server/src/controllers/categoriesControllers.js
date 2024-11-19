import QueryBuilder from "../builder/QueryBuilder.js";
import { Categories } from "../models/categoriesModel.js";
import sendResponse from "../utils/sendResponse.js";

const createCategories = async (req, res, next) => {
  try {
    const categoriesData = req.body;
    const result = await Categories.create(categoriesData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Categories created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categoriesQuery = new QueryBuilder(Categories.find(), req.query)
      .search(["name"])
      .sort()
      .paginate()
      .filter();

    const result = await categoriesQuery.moduleQuery;
    const meta = await categoriesQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All categories",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;

    const result = await Categories.findByIdAndUpdate(id, categoryData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Categories.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const categoriesControllers = {
  createCategories,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
