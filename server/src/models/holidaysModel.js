import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const holidaysSchema = new Schema(
  {
    name: {
      type: String,
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
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [activeStatus.ACTIVE, activeStatus.INACTIVE],
      default: activeStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

export const Holidays = mongoose.model("Holidays", holidaysSchema);
