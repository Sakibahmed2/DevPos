import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const bankAccountSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
    },
    status: {
      type: String,
      enum: [activeStatus.ACTIVE, activeStatus.INACTIVE],
      default: activeStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const BankAccounts = mongoose.model("BankAccounts", bankAccountSchema);
