import QueryBuilder from "../builder/QueryBuilder.js";
import { Holidays } from "../models/holidaysModel.js";
import calculateDateDifference from "../utils/calculateDateDifference.js";
import sendResponse from "../utils/sendResponse.js";

const createHolidays = async (req, res, next) => {
  try {
    const holidayData = req.body;
    const startDate = holidayData.startDate;
    const endDate = holidayData.endDate;

    // Calculate the duration of the holiday
    const { days } = calculateDateDifference(startDate, endDate);

    const newHolidays = {
      ...holidayData,
      duration: days,
    };

    const result = await Holidays.create(newHolidays);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Holidays created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllHolidays = async (req, res, next) => {
  try {
    const holidayQuery = new QueryBuilder(Holidays.find(), req.query)
      .search(["name"])
      .filter()
      .sort()
      .paginate();

    const result = await holidayQuery.moduleQuery;
    const meta = await holidayQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Holidays fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleHolidays = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Holidays.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Holiday fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateHolidays = async (req, res, next) => {
  try {
    const { id } = req.params;
    const holidayData = req.body;
    const startDate = holidayData.startDate;
    const endDate = holidayData.endDate;

    // Calculate the duration of the holiday
    const { days } = calculateDateDifference(startDate, endDate);

    const updatedHolidays = {
      ...holidayData,
      duration: days,
    };

    const result = await Holidays.findByIdAndUpdate(id, updatedHolidays, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Holiday updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHolidays = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Holidays.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Holiday deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const holidaysControllers = {
  createHolidays,
  getAllHolidays,
  getSingleHolidays,
  updateHolidays,
  deleteHolidays,
};
