import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  JWT_SECRET: z.string(),
  MONGO_URL: z.string(),
});

console.log("ENV CHECK:", {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
});

export const env = envSchema.parse(process.env);