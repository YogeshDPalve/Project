import { Router } from "express";
import {
  getUser,
  regiterStudent,
  studentLogin,
} from "../controllers/student.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/register", regiterStudent);
router.post("/login", studentLogin);
router.get("/", authMiddleware, getUser);

export default router;
