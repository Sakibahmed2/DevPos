import QueryBuilder from "../builder/QueryBuilder.js";
import { BankAccounts } from "../models/bankAccountModel.js";
import sendResponse from "../utils/sendResponse.js";

const createBankAccount = async (req, res, next) => {
  try {
    const bankAccount = req.body;

    const result = await BankAccounts.create(bankAccount);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Bank account created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBankAccounts = async (req, res, next) => {
  try {
    const bankAccountQuery = new QueryBuilder(BankAccounts.find(), req.query)
      .search(["bankName", "accountName", "branch"])
      .filter()
      .sort()
      .paginate();

    const result = await bankAccountQuery.moduleQuery;
    const meta = await bankAccountQuery.countTotal();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All bank accounts",
      data: {
        result,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getBankAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await BankAccounts.findById(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bank account details",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateBankAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bankAccount = req.body;

    const result = await BankAccounts.findByIdAndUpdate(id, bankAccount, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bank account updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBankAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    await BankAccounts.findByIdAndDelete(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bank account deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const bankAccountControllers = {
  createBankAccount,
  getAllBankAccounts,
  getBankAccount,
  updateBankAccount,
  deleteBankAccount,
};
