import { body, validationResult } from "express-validator";

const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

export const productValidator = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("brand").trim().notEmpty().withMessage("Product brand is required"),
  body("processor").trim().notEmpty().withMessage("Product processor is required"),
  body("display").trim().notEmpty().withMessage("Product display is required"),
  body("graphics").trim().notEmpty().withMessage("Product graphics is required"),
  body("operatingSystem").trim().notEmpty().withMessage("Product operating system is required"),
  body("description").trim().notEmpty().withMessage("Product description is required"),
  validate,
];