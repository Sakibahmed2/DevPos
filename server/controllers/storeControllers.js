import QueryBuilder from "../builder/QueryBuilder.js";
import { Stores } from "../models/storeModel.js";
import sendResponse from "../utils/sendResponse.js";

const createStore = async (req, res, next) => {
  try {
    const store = req.body;

    const result = await Stores.create(store);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Store created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStores = async (req, res, next) => {
  try {
    const storesQuery = new QueryBuilder(Stores.find(), req.query)
      .search(["storeName", "ownerName"])
      .filter()
      .sort()
      .paginate();

    const result = await storesQuery.moduleQuery;
    const meta = await storesQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stores fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStore = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Stores.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Store fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = req.body;

    const result = await Stores.findByIdAndUpdate(id, store, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Store updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Stores.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Store deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const storeControllers = {
  createStore,
  getAllStores,
  getSingleStore,
  updateStore,
  deleteStore,
};
