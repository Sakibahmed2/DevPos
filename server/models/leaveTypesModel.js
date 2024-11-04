import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const leaveTypesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quote: {
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

export const LeaveTypes = mongoose.model("Leaves", leaveTypesSchema);
