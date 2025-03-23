import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../constants/interfaces";

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { token } = req.cookies;
  if (!token) {
    res.status(404).send({
      success: false,
      message: "Token not exists",
    });
    return;
  }
  const tokenString: string = token.split(" ")[1];
  //   console.log(tokenString);
  const decode = jwt.verify(
    tokenString,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
  //   console.log(decode);

  if (!decode) {
    return res.status(404).send({
      success: false,
      message: "Invalid Token",
    });
  }
  req.id = decode.userId;
  next();
};

export default authMiddleware;
