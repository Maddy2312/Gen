import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      processor,
      display,
      graphics,
      operatingSystem,
      description,
    } = req.body;
    const seller = req.user;
    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );

    const product = await productModel.create({
      name,
      brand,
      processor,
      display,
      graphics,
      operatingSystem,
      description,
      seller: seller.id,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sellerProducts = async (req, res) => {
  try {
    const seller = req.user;
    const products = await productModel.find({ seller: seller.id });
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if(!products){
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};