import { Schema } from "mongoose";

const salesReturnSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
});
