import mongoose, { Schema } from "mongoose";

const salesReturnSchema = new Schema(
  {
    customerName: {
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
      enum: ["Pending", "Received", "Refunded"],
      default: "Pending",
    },
    paymentTypeStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Partial"],
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  }
);

export const SalesReturn = mongoose.model("SalesReturn", salesReturnSchema);
