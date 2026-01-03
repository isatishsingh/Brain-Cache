import { Request, Response, NextFunction } from "express";
import z from "zod";

const UserSignUpSchema = z.object({
  firstName: z.string().min(3).trim(),
  lastName: z.string().min(3).trim(),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(6)
    .max(20)
    .trim()
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
});

const UserSignInSchema = z.object({
    email : z.string().trim().email(),
    password : z.string().trim().min(6).max(20).regex(/[A-Z]/,"Must include at least one uppercase letter")
    .regex(/[a-z]/,"Must include at least one lowercase letter")
    .regex(/[0-9]/,"Must include at least one number")
    .regex(/[^A-Za-z0-9]/,"Must include at least one special character")
})

export const credentialCheckerSignUp = (req: Request, res: Response, next: NextFunction) => {
  const parsedData = UserSignUpSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      error: parsedData.error,
      message: "Invalid user input",
    });
  }
  next();
};

export const credentialCheckerSignIn = (req: Request, res:Response, next: NextFunction) =>{
    const parsedData = UserSignInSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            error: parsedData.error,
            message: "Invalid user input",
        });
    }
    next();
}
