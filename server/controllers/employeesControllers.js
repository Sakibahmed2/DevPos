import QueryBuilder from "../builder/QueryBuilder.js";
import { Employees } from "../models/employeesModel.js";
import sendResponse from "../utils/sendResponse.js";

const createEmployees = async (req, res, next) => {
  try {
    const lastEmployee = await Employees.findOne({
      employeeCode: { $regex: /EMP-/ },
    })
      .sort({ employeeCode: -1 })
      .exec();

    // Generate new code
    const lastCodeNumber = lastEmployee
      ? parseInt(lastEmployee.employeeCode.split("-")[1], 10)
      : 0;
    const newCode = `EMP-${(lastCodeNumber + 1).toString().padStart(4, "0")}`;

    const employeeData = { ...req.body, employeeCode: newCode };
    const result = await Employees.create(employeeData);

    // Send response
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Employee created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    const employeeQuery = new QueryBuilder(
      Employees.find().populate("shift department designation", "name"),
      req.query
    )
      .search(["firstName", "lastName", "email", "employeeCode"])
      .filter()
      .sort()
      .paginate();

    const result = await employeeQuery.moduleQuery;
    const meta = await employeeQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All employees fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleEmployees = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Employees.findById(id).populate(
      "shift department designation",
      "name"
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Single employee fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Employees.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Employee updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Employees.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const employeesControllers = {
  createEmployees,
  getAllEmployees,
  getSingleEmployees,
  updateEmployee,
  deleteEmployee,
};
