import { model, Schema } from "mongoose";
import { IProduct } from "../interface/product";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    meta_key: {
      type: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock_status: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    photos: {
      type: [{ type: String }],
    },
  },
  { timestamps: true },
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
