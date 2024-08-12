import { model, Schema } from "mongoose";
import { ICategory } from "../interface/category";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    parent_category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true },
);

export const Category = model<ICategory>("Category", categorySchema);
