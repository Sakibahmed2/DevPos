import mongoose, { Schema } from "mongoose";

const productInfo = {
  slug: { type: String, required: true },
  stockKeepingUnit: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  brand: { type: String, required: true },
  unit: { type: String, required: true },
  sellingType: { type: String, required: true },
  barcodeSymbology: { type: String, required: true },
  itemCode: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  warehouse: { type: String },
  store: { type: String },
};

const productPriceAndStock = {
  productType: {
    type: String,
    enum: ["single", "variable"],
    default: "single",
  },
  price: { type: Number, required: true },
  taxType: { type: String, required: true },
  discountType: { type: String, required: true },
  discountValue: { type: Number, required: true },
  quantityAlert: { type: Number, required: true },
  quantity: { type: Number, required: true },
};

const createdBy = {
  type: Schema.Types.ObjectId,
  ref: "Users",
};

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    productInfo: productInfo,
    pricingAndStock: productPriceAndStock,
    createdBy: createdBy,
  },
  {
    timestamps: true,
  }
);

export const Products = mongoose.model("Products", productSchema);
