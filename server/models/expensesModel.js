import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const expenseSchema = new Schema(
  {
    expenseCategory: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseCategories",
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
    expenseFor: {
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
