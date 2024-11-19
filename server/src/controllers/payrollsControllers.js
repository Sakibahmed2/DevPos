import QueryBuilder from "../builder/QueryBuilder.js";
import { Payrolls } from "../models/payrollsModel.js";
import sendResponse from "../utils/sendResponse.js";

const createPayrolls = async (req, res, next) => {
  try {
    const payrollData = req.body;

    const result = await Payrolls.create(payrollData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Payroll created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayrolls = async (req, res, next) => {
  try {
    const payrollQuery = new QueryBuilder(
      Payrolls.find().populate({
        path: "employee",
        select: ["firstName", "lastName", "email", "employeeCode"],
        populate: {
          path: "designation",
          select: ["name"],
        },
      }),
      req.query
    )
      .search(["employee?.firstName"])
      .filter()
      .sort()
      .paginate();

    const result = await payrollQuery.moduleQuery;
    const meta = await payrollQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payrolls fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePayroll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Payrolls.findById(id).populate({
      path: "employee",
      select: ["firstName", "lastName", "email", "employeeCode"],
      populate: {
        path: "designation",
        select: ["name"],
      },
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payroll fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updatePayroll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payrollData = req.body;

    const result = await Payrolls.findByIdAndUpdate(id, payrollData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payroll updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deletePayroll = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Payrolls.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payroll deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const payrollsControllers = {
  createPayrolls,
  getAllPayrolls,
  getSinglePayroll,
  updatePayroll,
  deletePayroll,
};
