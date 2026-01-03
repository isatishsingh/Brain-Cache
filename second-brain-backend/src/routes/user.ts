import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../models/user.js";
import { credentialCheckerSignIn, credentialCheckerSignUp } from "../middleware/credentialChecker.js";
import { signIn } from "../types/signIn.js";
import { signUp } from "../types/signUp.js";
import { authChecker } from "../middleware/authChecker.js";
import { env } from "../config/env.js";

const UserRouter = Router();

UserRouter.post("/api/v1/signup", credentialCheckerSignUp, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } : signUp = req.body;

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        message: "this email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: "Internal Server Error",
    });
  }
});

UserRouter.post("/api/v1/signin", credentialCheckerSignIn, async (req: Request, res: Response) => {
    try {
        const {email, password} : signIn = req.body;

        const userExists = await users.findOne({email});

        if(!userExists){
            return res.status(404).json({
                message : "User Not found, please signUp first",
            })
        }

        if(!userExists.password){
            return res.status(500).json({
                message : "Password not found for the user",
            })
        }

        const isPasswordValid = await bcrypt.compare(password,userExists.password);

        if(!isPasswordValid){
            return res.status(401).json({
                message : "email or password are not matched",
            });
        }

        const token = jwt.sign(
            {id: userExists._id}, 
            env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message : "User login successfully",
            token: token,
        });
    } catch (error) {
        
        return res.status(500).json({
            message: "Internal Server Error",
            error : error,
        });
    }
});

UserRouter.post("/api/v1/logout", authChecker, async (req, res) => {
    try {
        // The token will be invalidated by removing it from the client
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

UserRouter.get("/api/v1/profile", authChecker, async (req, res) => {
   try {
       const userId: string | undefined = req.userId;

       if(!userId){
        return res.status(400).json({
            message : "User not found",
        });
    }

    const userProfileData = await users.findById(userId);
    return res.status(200).json(userProfileData);
   } catch (error) {
    return res.status(500).json({
        message : "Internal Server Error",
        error : error,
    })
   }
});

export { UserRouter };
