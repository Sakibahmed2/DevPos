import QueryBuilder from "../builder/QueryBuilder.js";
import { Warehouses } from "../models/warehouseModel.js";
import sendResponse from "../utils/sendResponse.js";

const createWarehouse = async (req, res, next) => {
  try {
    const result = await Warehouses.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Warehouse created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllWarehouses = async (req, res, next) => {
  try {
    const warehouseQuery = new QueryBuilder(Warehouses.find(), req.query)
      .search(["name", "contactPerson"])
      .filter()
      .sort()
      .paginate();

    const result = await warehouseQuery.moduleQuery;
    const meta = await warehouseQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Warehouses fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Warehouses.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Warehouse fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const warehouseUpdatedData = req.body;

    const result = await Warehouses.findByIdAndUpdate(
      id,
      warehouseUpdatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Warehouse updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Warehouses.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Warehouse deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const warehouseControllers = {
  createWarehouse,
  getAllWarehouses,
  getSingleWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
