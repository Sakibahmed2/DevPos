import QueryBuilder from "../builder/QueryBuilder.js";
import { BanIPAddresses } from "../models/banIpModel.js";
import sendResponse from "../utils/sendResponse.js";

const createBanIp = async (req, res, next) => {
  try {
    const banIpData = req.body;

    const banIp = await BanIPAddresses.create(banIpData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Ban IP created successfully",
      data: banIp,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBanIp = async (req, res, next) => {
  try {
    const banIpQuery = new QueryBuilder(BanIPAddresses.find(), req.query)
      .search(["ipAddress", "reasonForBan"])
      .filter()
      .sort()
      .paginate();

    const result = await banIpQuery.moduleQuery;
    const meta = await banIpQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ban IP fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getBanIp = async (req, res, next) => {
  try {
    const { id } = req.params;

    const banIp = await BanIPAddresses.findById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ban IP fetched successfully",
      data: banIp,
    });
  } catch (error) {
    next(error);
  }
};

const updateBanIp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banIpData = req.body;

    const banIp = await BanIPAddresses.findByIdAndUpdate(id, banIpData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ban IP updated successfully",
      data: banIp,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBanIp = async (req, res, next) => {
  try {
    const { id } = req.params;

    await BanIPAddresses.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ban IP deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const banIpControllers = {
  createBanIp,
  getAllBanIp,
  getBanIp,
  updateBanIp,
  deleteBanIp,
};
