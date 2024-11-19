import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const shiftsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    weekOff: {
      type: String,
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

export const Shifts = mongoose.model("Shifts", shiftsSchema);
