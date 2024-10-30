import { Schema } from "mongoose";
import { salesReturnStatus } from "../constant/global";

const salesReturnSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Sales",
    required: true,
  },
  status: {
    type: String,
    enum: [
      salesReturnStatus.RECEIVED,
      salesReturnStatus.PENDING,
      salesReturnStatus.ORDERED,
    ],
  },
});
