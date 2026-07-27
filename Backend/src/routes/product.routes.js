import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { createVariantValidator, productValidator } from "../validators/product.validator.js";
import { createProduct, createVariant, getProductById, sellerProducts, userProducts } from "../controllers/product.controller.js";
const productRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

productRouter.post("/create", authenticateSeller, upload.array("images", 10), productValidator, createProduct);
productRouter.post("/:id/variants", authenticateSeller, upload.array("images", 10), createVariantValidator, createVariant)
productRouter.get("/seller", authenticateSeller, sellerProducts);
productRouter.get("/user", userProducts);
productRouter.get("/getProduct/:id", getProductById);



export default productRouter;
