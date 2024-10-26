import mongoose, { Schema } from "mongoose";

const manageStockSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouses",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Stores",
      required: true,
    },
    responsiblePerson: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const MangeStocks = mongoose.model("MangeStocks", manageStockSchema);
