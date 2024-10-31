import mongoose, { Schema } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

export const Shifts = mongoose.model("Shifts", shiftsSchema);
