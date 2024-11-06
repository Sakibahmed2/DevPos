import mongoose, { Schema } from "mongoose";

const payrollsSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    hraAllowance: {
      type: Number,
    },
    conveyance: {
      type: Number,
    },
    medical: {
      type: Number,
    },
    bonus: {
      type: Number,
    },
    other: {
      type: Number,
    },
    totalAllowance: {
      type: Number,
      required: true,
    },
    totalDeduction: {
      type: Number,
      required: true,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Payrolls = mongoose.model("Payrolls", payrollsSchema);
