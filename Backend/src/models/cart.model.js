import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product.variants",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        currency: {
          type: String,
          enum: ["INR", "USD", "EUR"],
          default: "USD",
        },
      },
    },
  ],
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
