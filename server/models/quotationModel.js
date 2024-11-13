import mongoose, { Schema } from "mongoose";

const quotationSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    refNo: {
      type: String,
    },
    tax: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    shipping: {
      type: Number,
    },
    total: {
      type: Number,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Sent", "Ordered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Quotations = mongoose.model("Quotations", quotationSchema);
