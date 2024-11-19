import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const banIPSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    reasonForBan: {
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

export const BanIPAddresses = mongoose.model("BanIPAddresses", banIPSchema);
