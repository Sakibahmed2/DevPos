import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: activeStatus.ACTIVE,
      enum: [activeStatus.ACTIVE, activeStatus.INACTIVE],
    },
  },
  {
    timestamps: true,
  }
);

export const Categories = mongoose.model("Categories", categoriesSchema);
