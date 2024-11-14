import { Company } from "../models/companyModel.js";
import sendResponse from "../utils/sendResponse.js";

const createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Company found",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Company.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Company updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const companyControllers = {
  createCompany,
  getSingleCompany,
  updateCompany,
};
