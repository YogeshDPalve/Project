import { Request } from "express";

interface AuthRequest extends Request {
  id?: string;
}

export { AuthRequest };
