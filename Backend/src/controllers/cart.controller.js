import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const variant = product.variants.id(variantId);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    const cart =
      (await cartModel.findOne({
        user: user._id,
      })) || (await cartModel.create({ user: user._id }));

    const isProductAlreadyInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId,
    );
    if (isProductAlreadyInCart) {
      const quantityInCart = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId,
      ).quantity;
      if (
        quantityInCart + quantity >
        (await stockOfVariant(productId, variantId))
      ) {
        return res.status(400).json({
          success: false,
          message: "quantity exceeds stock",
        });
      }
      await cartModel.findOneAndUpdate(
        {
          user: user._id,
          "items.product": productId,
          "items.variant": variantId,
        },
        {
          $inc: {
            "items.$.quantity": quantity,
          },
        },
        { new: true },
      );
      return res.status(200).json({
        success: true,
        message: "cart updated successfully",
      });
    }
    if (quantity > (await stockOfVariant(productId, variantId))) {
      return res.status(400).json({
        success: false,
        message: "quantity exceeds stock",
      });
    }

    cart.items.push({
      product: productId,
      variant: variantId,
      quantity,
      price: {
        amount: variant.price.amount,
        currency: variant.price.currency,
      },
    });

    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      cart = await cartModel.create({ user: req.user._id });
    }
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
