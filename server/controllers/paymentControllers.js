import Stripe from "stripe";
import config from "../config/index.js";
import sendResponse from "../utils/sendResponse.js";
import { Sales } from "../models/paymentModel.js";
import QueryBuilder from "../builder/QueryBuilder.js";

const stripe = new Stripe(config.stripe_secret_key);

const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment intent created successfully",
      data: { clientSecret },
    });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;

    if (!orderData.refNo) {
      orderData.refNo = `ORD${Math.random()
        .toString()
        .substr(2, 5)
        .toUpperCase()}`;
    }

    // Check if payment due
    if (orderData.amount > orderData.paid) {
      orderData.due = orderData.amount - orderData.paid;
      orderData.status = "Pending";
      orderData.paymentTypeStatus = "Due";
    } else {
      orderData.due = 0;
      orderData.status = "Completed";
      orderData.paymentTypeStatus = "Paid";
    }

    const result = await Sales.create(orderData);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment intent created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const saleQuery = new QueryBuilder(
      Sales.find().populate("biller", "name email"),
      req.query
    )
      .search(["refNo", "customerName"])
      .filter()
      .sort()
      .paginate();

    const result = await saleQuery.moduleQuery;
    const meta = await saleQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All sales fetched successfully",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSingleSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Sales.findById(id).populate("biller", "name email");

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Single sale fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const sale = await Sales.findOne({ _id: id });

    const saleData = updatedData;

    // check if payment due
    if (saleData.amount > saleData.paid) {
      saleData.due = saleData.amount - saleData.paid;
      saleData.amount = sale.amount;
      saleData.paid = saleData.paid + sale.paid;
      saleData.status = "Pending";
      saleData.paymentTypeStatus = "Due";
    } else {
      saleData.due = 0;
      saleData.amount = sale.amount;
      saleData.paid = saleData.paid + sale.paid;
      saleData.status = "Completed";
      saleData.paymentTypeStatus = "Paid";
    }

    const result = await Sales.findByIdAndUpdate(id, saleData, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Sale updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Sales.findByIdAndDelete(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Sale deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const paymentControllers = {
  createPaymentIntent,
  createOrder,
  getAllSales,
  getSingleSale,
  updateSale,
  deleteSale,
};
