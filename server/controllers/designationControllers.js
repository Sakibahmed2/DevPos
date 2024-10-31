import QueryBuilder from "../builder/QueryBuilder.js";
import { Designations } from "../models/designationModel.js";
import sendResponse from "../utils/sendResponse.js";

const createDesignations = async (req, res, next) => {
  try {
    const designationData = req.body;
    const isDesignationExists = await Designations.isDesignationExists(
      designationData.name
    );
    if (isDesignationExists) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Designation already exists",
      });
    }

    const designation = await Designations.create(designationData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Designation created successfully",
      data: designation,
    });
  } catch (err) {
    next(err);
  }
};

const getAllDesignations = async (req, res, next) => {
  try {
    const queryBuilder = new QueryBuilder(Designations.find(), req.query)
      .search(["name"])
      .filter()
      .sort()
      .paginate();

    const result = await queryBuilder.moduleQuery;
    const meta = await queryBuilder.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Designations fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleDesignations = async (req, res, next) => {
  try {
    const designation = await Designations.findById(req.params.id);
    if (!designation) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Designation not found",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Designation fetched successfully",
      data: designation,
    });
  } catch (err) {
    next(err);
  }
};

const updateDesignations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const designationData = req.body;
    const designation = await Designations.findByIdAndUpdate(
      id,
      designationData,
      {
        new: true,
      }
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Designation updated successfully",
      data: designation,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDesignations = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Designations.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Designation deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const designationControllers = {
  createDesignations,
  getAllDesignations,
  getSingleDesignations,
  updateDesignations,
  deleteDesignations,
};
