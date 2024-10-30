import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const expenseSchema = new Schema(
  {
    expanseCategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    refNo: {
      type: String,
      required: true,
    },
    expanseFor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: [activeStatus.ACTIVE, activeStatus.INACTIVE],
      default: activeStatus.ACTIVE,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Expanses = mongoose.model("Expanses", expenseSchema);
