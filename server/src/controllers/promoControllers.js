import QueryBuilder from "../builder/QueryBuilder.js";
import { Promos } from "../models/promoModel.js";
import sendResponse from "../utils/sendResponse.js";

const createPromo = async (req, res, next) => {
  try {
    const promoData = req.body;

    const result = await Promos.create(promoData);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Promo created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPromos = async (req, res, next) => {
  try {
    const promoQuery = new QueryBuilder(Promos.find(), req.query)
      .search(["name", "code", "type"])
      .filter()
      .sort()
      .paginate();

    const result = await promoQuery.moduleQuery;
    const meta = await promoQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promos fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSinglePromo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Promos.findById(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promo fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updatePromo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Promos.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promo updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deletePromo = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Promos.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promo deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const promoControllers = {
  createPromo,
  getAllPromos,
  getSinglePromo,
  updatePromo,
  deletePromo,
};
