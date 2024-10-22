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
};

const productSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  productInfo: productInfo,
  productPriceAndStock: productPriceAndStock,
});

export const Products = mongoose.model("Products", productSchema);
