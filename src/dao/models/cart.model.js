import { Schema, model } from "mongoose";

const CartSchema = new Schema({
items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

export default model("Carts", CartSchema);