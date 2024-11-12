import mongoose, { Schema } from "mongoose";
import { paymentStatus, paymentType } from "../constant/global.js";

const purchaseSchema = new Schema(
  {
    transactionId: {
      type: String,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    name: {
      type: String,
    },
    refNo: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
    },
    due: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        paymentStatus.COMPLETED,
        paymentStatus.PENDING,
        paymentStatus.ORDERED,
      ],
      default: paymentStatus.ORDERED,
    },
    paymentTypeStatus: {
      type: String,
      enum: [paymentType.PAID, paymentType.UNPAID, paymentType.PARTIAL],
      default: paymentType.PARTIAL,
    },
  },
  {
    timestamps: true,
  }
);

export const Purchases = mongoose.model("Purchases", purchaseSchema);
