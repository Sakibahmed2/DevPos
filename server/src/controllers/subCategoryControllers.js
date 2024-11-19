import QueryBuilder from "../builder/QueryBuilder.js";
import { Categories } from "../models/categoriesModel.js";
import { SubCategories } from "../models/subCategoryModal.js";
import sendResponse from "../utils/sendResponse.js";

const createCategory = async (req, res, next) => {
  try {
    const categoryData = req.body;
    const result = await SubCategories.create(categoryData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Sub category created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const subCategoryQuery = new QueryBuilder(
      SubCategories.find()
        .populate("parentCategory", "name")
        .populate("createdBy", "name"),
      req.query
    )
      .search(["name"])
      .sort()
      .paginate()
      .filter();

    const result = await subCategoryQuery.moduleQuery;
    const meta = await subCategoryQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sub categories fetched successfully",
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

    const result = await SubCategories.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sub category fetched successfully",
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

    const result = await SubCategories.findByIdAndUpdate(id, categoryData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sub category updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await SubCategories.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sub category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const subCategoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
