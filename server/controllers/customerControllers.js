import QueryBuilder from "../builder/QueryBuilder.js";
import { Customers } from "../models/customerModel.js";
import sendResponse from "../utils/sendResponse.js";

const createCustomer = async (req, res, next) => {
  try {
    // Create customer code
    const customerCount = await Customers.countDocuments();
    const newCode = `C-${(customerCount + 1).toString().padStart(4, "0")}`;

    const customerData = { ...req.body, code: newCode };

    const result = await Customers.create(customerData);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Customer created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCustomers = async (req, res, next) => {
  try {
    const customerQuery = new QueryBuilder(Customers.find(), req.query)
      .search(["name", "email", "country"])
      .filter()
      .sort()
      .paginate();

    const result = await customerQuery.moduleQuery;
    const meta = await customerQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All customers fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCustomers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Customers.findById(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Single customer successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Customers.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Customer updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Customers.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Customer deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const customerControllers = {
  createCustomer,
  getAllCustomers,
  getSingleCustomers,
  updateCustomer,
  deleteCustomer,
};
