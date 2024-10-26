import mongoose, { Schema } from "mongoose";

const warehouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Warehouses = mongoose.model("Warehouses", warehouseSchema);
