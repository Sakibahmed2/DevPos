import { activeStatus } from "../constant/global.js";
import mongoose, { Schema } from "mongoose";

const promoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
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

export const Promos = mongoose.model("Promos", promoSchema);
