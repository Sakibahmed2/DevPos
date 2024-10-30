import QueryBuilder from "../builder/QueryBuilder.js";
import { ExpenseCategories } from "../models/expenseCategoryModel.js";
import sendResponse from "../utils/sendResponse.js";

const createExpenseCategory = async (req, res, next) => {
  try {
    const result = await ExpenseCategories.create(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Expense category created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllExpenseCategories = async (req, res, next) => {
  try {
    const expenseCategoryQuery = new QueryBuilder(
      ExpenseCategories.find(),
      req.query
    )
      .search(["name", "description"])
      .filter()
      .sort()
      .paginate();

    const result = await expenseCategoryQuery.moduleQuery;
    const meta = await expenseCategoryQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All expense categories",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleExpenseCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await ExpenseCategories.findById(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single expense category",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateExpenseCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await ExpenseCategories.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Expense category updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteExpenseCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ExpenseCategories.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Expense category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const expenseCategoryControllers = {
  createExpenseCategory,
  getAllExpenseCategories,
  getSingleExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
};
