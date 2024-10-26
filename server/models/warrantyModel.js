import mongoose, { Schema } from "mongoose";

const warrantySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Warranties = mongoose.model("Warranties", warrantySchema);
