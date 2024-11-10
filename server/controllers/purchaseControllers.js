import Stripe from "stripe";
import config from "../config/index.js";
import { paymentStatus, paymentType } from "../constant/global.js";
import { Purchases } from "../models/purchaseModel.js";
import sendResponse from "../utils/sendResponse.js";
import QueryBuilder from "../builder/QueryBuilder.js";

const stripe = new Stripe(config.stripe_secret_key);

const createPurchasePaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const client_secret = paymentIntent.client_secret;

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment intent created successfully",
      data: { client_secret },
    });
  } catch (err) {
    next(err);
  }
};

const createPurchase = async (req, res, next) => {
  try {
    const purchaseData = req.body;

    if (!purchaseData.refNo) {
      purchaseData.refNo = `PUR${Math.random()
        .toString()
        .substr(2, 5)
        .toUpperCase()}`;
    }

    // Check if payment due
    if (purchaseData.paid < purchaseData.amount) {
      purchaseData.due = purchaseData.amount - purchaseData.paid;
      purchaseData.status =
        purchaseData.paid === 0 ? paymentStatus.ORDERED : paymentStatus.PENDING;
      purchaseData.paymentTypeStatus =
        purchaseData.paid === 0 ? paymentType.PARTIAL : paymentType.UNPAID;
    } else {
      purchaseData.due = 0;
      purchaseData.status = paymentStatus.COMPLETED;
      purchaseData.paymentTypeStatus = paymentType.PAID;
    }

    const result = await Purchases.create(purchaseData);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Purchase created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPurchase = async (req, res, next) => {
  try {
    const purchaseQuery = new QueryBuilder(
      Purchases.find()
        .populate(
          "products",
          "name img pricingAndStock.price pricingAndStock.quantity productInfo.category productInfo.stockKeepingUnit productInfo.brand"
        )
        .populate("supplier", "name email "),
      req.query
    )
      .search(["refNo", "status", "supplier.name"])
      .filter()
      .sort()
      .paginate();

    const result = await purchaseQuery.moduleQuery;
    const meta = await purchaseQuery.countTotal();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All purchases",
      data: {
        result,
        meta,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getSinglePurchase = async (req, res, next) => {
  try {
    const purchase = await Purchases.findById(req.params.id)
      .populate(
        "products",
        "name img pricingAndStock.price pricingAndStock.quantity productInfo.category productInfo.stockKeepingUnit productInfo.brand"
      )
      .populate("supplier", "name email");

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Single purchase",
      data: purchase,
    });
  } catch (err) {
    next(err);
  }
};

const updatePurchase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchaseData = req.body;

    // Purchase data
    const purchase = await Purchases.findById(id);

    // Check if payment due
    if (purchaseData.paid < purchaseData.amount) {
      purchaseData.due = purchaseData.amount - purchaseData.paid;
      purchaseData.amount = purchaseData.amount;
      purchaseData.paid = purchaseData.paid + purchase.paid;

      purchaseData.status =
        purchaseData.paid === 0 ? paymentStatus.ORDERED : paymentStatus.PENDING;

      purchaseData.paymentTypeStatus =
        purchaseData.paid === 0 ? paymentType.PARTIAL : paymentType.UNPAID;
    } else {
      purchaseData.due = 0;
      purchaseData.amount = purchase.amount;
      purchaseData.paid = purchaseData.paid + purchase.paid;
      purchaseData.status = paymentStatus.COMPLETED;
      purchaseData.paymentTypeStatus = paymentType.PAID;
    }

    const result = await Purchases.findByIdAndUpdate(id, purchaseData, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Purchase updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deletePurchase = async (req, res, next) => {
  try {
    await Purchases.findByIdAndDelete(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Purchase deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const purchaseControllers = {
  createPurchasePaymentIntent,
  createPurchase,
  getAllPurchase,
  getSinglePurchase,
  updatePurchase,
  deletePurchase,
};
