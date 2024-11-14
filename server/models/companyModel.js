import mongoose, { Schema } from "mongoose";

const address = {
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
};

const companySchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    tax: {
      type: String,
    },
    website: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    companyIcon: {
      type: String,
    },
    favicon: {
      type: String,
    },
    address: address,
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model("Company", companySchema);
