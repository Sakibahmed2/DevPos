import mongoose, { Schema } from "mongoose";

const purchaseReturnSchema = new Schema(
  {
    supplierName: {
      type: String,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    status: {
      type: String,
      enum: ["Received", "Refunded", "Pending"],
      default: "Pending",
    },
    paymentTypeStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Partial"],
      default: "Unpaid",
    },
    refNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PurchaseReturn = mongoose.model(
  "PurchaseReturn",
  purchaseReturnSchema
);
