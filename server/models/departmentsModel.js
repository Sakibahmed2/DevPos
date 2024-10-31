import mongoose, { Schema } from "mongoose";

const departmentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    HOD: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Departments = mongoose.model("Departments", departmentsSchema);
