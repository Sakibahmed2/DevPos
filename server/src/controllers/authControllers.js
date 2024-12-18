import config from "../config/index.js";
import { Users } from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import { createJwtToken } from "../utils/createJwtToken.js";
import sendResponse from "../utils/sendResponse.js";

const loginUser = async (req, res, next) => {
  try {
    const userInfo = req.body;

    // Check is user exists in database
    const isUserExist = await Users.findOne({ email: userInfo.email });

    if (!isUserExist) {
      throw new AppError(404, "User not found");
    }

    // Check if password is correct
    if (userInfo.password !== isUserExist.password) {
      throw new AppError(401, "Password is incorrect");
    }

    if (isUserExist.role === "user") {
      throw new AppError(403, "You are not authorized to login");
    }

    // Create token
    const jwtPayload = {
      id: isUserExist._id,
      role: isUserExist.role,
      email: isUserExist.email,
      name: isUserExist.name,
    };

    const accessToken = createJwtToken(
      jwtPayload,
      config.jwt_secret,
      config.jwt_expires_in
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const authControllers = {
  loginUser,
};
