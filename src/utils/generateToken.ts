import jwt from "jsonwebtoken";
import { Response } from "express";
const generateToken = (user: any, res: Response, msg: string) => {
  const token = `Bearer ${jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  )}`;

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //! for 1 day
    })
    .send({
      success: true,
      message: msg,
      token,
    });
};

export default generateToken;
