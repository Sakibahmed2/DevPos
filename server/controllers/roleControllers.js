import QueryBuilder from "../builder/QueryBuilder.js";
import { Roles } from "../models/roleModel.js";
import sendResponse from "../utils/sendResponse.js";

const createRole = async (req, res, next) => {
  try {
    const roleData = req.body;

    const result = await Roles.create(roleData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Role created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllRole = async (req, res, next) => {
  try {
    const roleQuery = new QueryBuilder(Roles.find(), req.query)
      .search(["name"])
      .filter()
      .sort()
      .paginate();

    const result = await roleQuery.moduleQuery;
    const meta = await roleQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All roles",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Roles.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Role found",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Roles.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Role updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Roles.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Role deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const roleControllers = {
  createRole,
  getAllRole,
  getSingleRole,
  updateRole,
  deleteRole,
};
