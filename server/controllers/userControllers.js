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

export const userControllers = {
  createUser,
};
