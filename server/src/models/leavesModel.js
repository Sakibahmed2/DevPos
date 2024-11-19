import mongoose, { Schema } from "mongoose";
import { leaveStatus } from "../constant/global.js";

const leaveSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
    leaveType: {
      type: Schema.Types.ObjectId,
      ref: "LeaveTypes",
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
      days: {
        type: Number,
        required: true,
      },
      hours: {
        type: Number,
        required: true,
      },
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: [leaveStatus.PENDING, leaveStatus.APPROVED, leaveStatus.REJECTED],
      default: leaveStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

export const Leaves = mongoose.model("Leaves", leaveSchema);
