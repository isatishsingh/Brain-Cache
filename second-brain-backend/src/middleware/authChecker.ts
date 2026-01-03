import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";

export const authChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Please login first to access the resources",
      });
    }

    const checkAuthToken = jwt.verify(authHeader as string, env.JWT_SECRET);

    if (checkAuthToken) {
      if (typeof checkAuthToken === "string") {
        res.status(403).json({
          message: "You are not logged in",
        });
        return;
      }
      req.userId = (checkAuthToken as JwtPayload).id;
      next();
    } else {
      res.status(403).json({
        message: "You are not logged in",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Invalid token id",
      error: error,
    });
  }
};
