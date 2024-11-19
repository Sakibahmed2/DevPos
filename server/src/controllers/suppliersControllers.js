import QueryBuilder from "../builder/QueryBuilder.js";
import { Suppliers } from "../models/suppliersModel.js";
import sendResponse from "../utils/sendResponse.js";

const createSupplier = async (req, res, next) => {
  try {
    // Create supplier code
    const supplierCount = await Suppliers.countDocuments();
    const supplierCode = `S-${(supplierCount + 1).toString().padStart(4, "0")}`;

    const supplierData = { ...req.body, code: supplierCode };

    const supplier = await Suppliers.create(supplierData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSuppliers = async (req, res, next) => {
  try {
    const supplierQuery = new QueryBuilder(Suppliers.find(), req.query)
      .search(["name", "email", "country"])
      .filter()
      .sort()
      .paginate();

    const result = await supplierQuery.moduleQuery;
    const meta = await supplierQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All suppliers",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await Suppliers.findById(id);

    // check if supplier exists
    if (!supplier) {
      return next({
        message: "Supplier not found",
        statusCode: 404,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single supplier",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Suppliers.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Supplier updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await Suppliers.findByIdAndDelete(id);

    // check if supplier exists
    if (!supplier) {
      return next({
        message: "Supplier not found",
        statusCode: 404,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const suppliersControllers = {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};
