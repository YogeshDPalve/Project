import { body, validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";

const validateRegistration = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("email").isEmail().notEmpty().withMessage("Invalid Email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array(),
        message: "Error in Input validation",
      });
    }
    next();
  },
];

const validateLogin = [
  body("email").notEmpty().isEmail().withMessage("Invalid Email format"),
  body("password").notEmpty().withMessage("passord is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array(),
        message: "Error in Input validation",
      });
    }
    next();
  },
];

export { validateRegistration, validateLogin };
