import mongoose, { Schema } from "mongoose";
import { paymentStatus, paymentType } from "../constant/global.js";

const paymentSchema = new Schema(
  {
    customerName: {
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
    biller: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [paymentStatus.COMPLETED, paymentStatus.PENDING],
      default: paymentStatus.PENDING,
    },
    paymentTypeStatus: {
      type: String,
      enum: [paymentType.PAID, paymentType.UNPAID],
      default: paymentType.UNPAID,
    },
  },
  {
    timestamps: true,
  }
);

export const Sales = mongoose.model("Sales", paymentSchema);
