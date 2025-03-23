import { Router } from "express";
import {
  getUser,
  registerStudent,
  studentLogin,
} from "../controllers/student.controller";
import authMiddleware from "../middlewares/authMiddleware";
import {
  validateLogin,
  validateRegistration,
} from "../middlewares/validationMiddleware";
import { ValidationChain } from "express-validator";

const router: Router = Router();

router.post(
  "/register",
  validateRegistration as ValidationChain[],
  registerStudent
);
router.post("/login", validateLogin as ValidationChain[], studentLogin);
router.get("/", authMiddleware, getUser);

export default router;
