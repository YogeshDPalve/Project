import { Request, Response } from "express";
import { studentModel } from "../models/student.schema";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../constants/interfaces";

const registerStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const checkUser = await studentModel.findOne({ email });
    if (checkUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists try with another email.",
      });
    }

    let hashedPassword: string = await bcrypt.hash(password, 10);

    const student = await studentModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).send({
      success: true,
      message: "Student created Successfully",
      student,
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      message: "Internal server error",
      error,
    });
  }
};

const studentLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "All fields are required",
    });
  }

  const student = await studentModel.findOne({ email });
  if (!student) {
    return res.status(400).send({
      success: false,
      message: "User not found please register first.",
    });
  }

  const checkPassword = bcrypt.compare(password, student.password);
  if (!checkPassword) {
    return res.status(400).send({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  generateToken(student, res, `welcome back ${student.firstName}`);
};

const getUser = async (req: AuthRequest, res: Response): Promise<any> => {
  const studentId: string = req.id as string;
  const student = await studentModel
    .findOne({ _id: studentId })
    .select("-password");

  if (!student) {
    return res.status(404).send({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  return res.status(200).send({
    success: true,
    message: "student details get successfully",
    student,
  });
};
export { registerStudent, studentLogin, getUser };
