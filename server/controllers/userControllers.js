import QueryBuilder from "../builder/QueryBuilder.js";
import { Users } from "../models/userModel.js";
import sendResponse from "../utils/sendResponse.js";

const createUser = async (req, res, next) => {
  try {
    const result = await Users.create(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const userQuery = new QueryBuilder(Users.find(), req.query)
      .search(["name", "email", "role"])
      .filter()
      .sort()
      .paginate();

    const result = await userQuery.moduleQuery;
    const meta = await userQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const result = await Users.findById(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Users.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
