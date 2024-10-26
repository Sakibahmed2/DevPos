import mongoose, { Schema } from "mongoose";

const stockTransferSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    noOfProduct: {
      type: Number,
      required: true,
    },
    quantityTransferred: {
      type: Number,
      required: true,
    },
    refNo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StockTransfers = mongoose.model(
  "StockTransfers",
  stockTransferSchema
);
