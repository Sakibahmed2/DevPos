import mongoose, { Schema } from "mongoose";
import { activeStatus, gender } from "../constant/global.js";

const employeesSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    img: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
    },
    employeeCode: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: [gender.MALE, gender.FEMALE, gender.OTHER],
    },
    nationality: {
      type: String,
    },
    joiningDate: {
      type: Date,
    },
    shift: {
      type: Schema.Types.ObjectId,
      ref: "Shifts",
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Departments",
      required: true,
    },
    designation: {
      type: Schema.Types.ObjectId,
      ref: "Designations",
      required: true,
    },
    bloodGroup: {
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

export const Employees = mongoose.model("Employees", employeesSchema);
