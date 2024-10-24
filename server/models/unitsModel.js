import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const unitsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true },
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

export const Units = mongoose.model("Units", unitsSchema);
