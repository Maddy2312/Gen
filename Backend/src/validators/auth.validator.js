import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }
    next();
}

export const registerValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").notEmpty().withMessage("Contact is required"),
    body("role").notEmpty().withMessage("Role is required"),
    validate
];

export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
    validate
]