import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerPhone: {
      type: String,
      required: true,
    },
    ownerEmail: {
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

export const Stores = mongoose.model("Stores", storeSchema);
