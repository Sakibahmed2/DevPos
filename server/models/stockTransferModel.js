import mongoose, { Schema } from "mongoose";

const stockTransferSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "Warehouses",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "Warehouses",
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
      unique: true,
    },
    note: {
      type: String,
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
