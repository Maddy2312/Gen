import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { productValidator } from "../validators/product.validator.js";
import { createProduct } from "../controllers/product.controller.js";
const productRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

productRouter.post("/create", authenticateSeller, upload.array("images", 10), productValidator, createProduct);

export default productRouter;
