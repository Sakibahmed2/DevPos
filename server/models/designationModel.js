import mongoose, { Schema } from "mongoose";
import { activeStatus } from "../constant/global.js";

const designationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

// check is name already exists
designationSchema.statics.isDesignationExists = async function (name) {
  return await Designations.findOne({ name });
};

export const Designations = mongoose.model("Designations", designationSchema);
