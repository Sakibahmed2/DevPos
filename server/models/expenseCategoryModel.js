import mongoose, { Schema } from "mongoose";

const expenseCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ExpenseCategories = mongoose.model(
  "ExpenseCategories",
  expenseCategorySchema
);
