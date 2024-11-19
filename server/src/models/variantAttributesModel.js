import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const variantAttributesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
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

export const VariantAttributes = mongoose.model(
  "VariantAttributes",
  variantAttributesSchema
);
