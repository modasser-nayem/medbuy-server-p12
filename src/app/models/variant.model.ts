import { model, Schema } from "mongoose";
import { IVariantSchema } from "../interface/variant";

const variantSchema = new Schema<IVariantSchema>(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

const Variant = model<IVariantSchema>("Variant", variantSchema);
export default Variant;
