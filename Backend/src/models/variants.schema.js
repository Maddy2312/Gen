import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  ram: {
    type: String,
    required: true,
  },

  storage: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "USD",
    },
  },

  stock: {
    type: Number,
    default: 0,
  },
});

export default variantSchema;