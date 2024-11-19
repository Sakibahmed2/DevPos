import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: activeStatus.ACTIVE,
      enum: [activeStatus.ACTIVE, activeStatus.INACTIVE],
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export const SubCategories = mongoose.model("SubCategories", subCategorySchema);
