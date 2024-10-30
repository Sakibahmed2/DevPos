import QueryBuilder from "../builder/QueryBuilder.js";
import { Expanses } from "../models/expensesModel.js";
import sendResponse from "../utils/sendResponse.js";

const createExpenses = async (req, res, next) => {
  try {
    const expanseData = req.body;

    const result = await Expanses.create(expanseData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Expenses created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllExpenses = async (req, res, next) => {
  try {
    const expanseQuery = new QueryBuilder(Expanses.find(), req.query)
      .search(["expanseCategory", "expanseFor", "refNo"])
      .filter()
      .sort()
      .paginate();

    const result = await expanseQuery.moduleQuery;
    const meta = await expanseQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All expenses",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleExpanses = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Expanses.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Expenses found",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateExpanses = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expanseData = req.body;

    const result = await Expanses.findByIdAndUpdate(id, expanseData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Expenses updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteExpanses = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Expanses.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Expenses deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const expensesControllers = {
  createExpenses,
  getAllExpenses,
  getSingleExpanses,
  updateExpanses,
  deleteExpanses,
};
