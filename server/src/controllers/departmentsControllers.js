import QueryBuilder from "../builder/QueryBuilder.js";
import { Departments } from "../models/departmentsModel.js";
import sendResponse from "../utils/sendResponse.js";

const createDepartments = async (req, res, next) => {
  try {
    const departmentData = req.body;

    const result = await Departments.create(departmentData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Department created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDepartments = async (req, res, next) => {
  try {
    const departmentQuery = new QueryBuilder(Departments.find(), req.query)
      .search(["name", "HOD"])
      .filter()
      .sort()
      .paginate();

    const result = await departmentQuery.moduleQuery;
    const meta = await departmentQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Departments fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleDepartments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Departments.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Department fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const departmentData = req.body;

    const result = await Departments.findByIdAndUpdate(id, departmentData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Department updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDepartments = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Departments.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const departmentsControllers = {
  createDepartments,
  getAllDepartments,
  getSingleDepartments,
  updateDepartments,
  deleteDepartments,
};
