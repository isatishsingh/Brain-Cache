import { env } from "./config/env.js";

import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from './routes/user.js';
import { ContentRouter } from './routes/content.js';

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to Second Brain World!"));
app.use("/user", UserRouter);
app.use("/content", ContentRouter);

const main = async() => {
    try {
        if (!env.MONGO_URL) {
        throw new Error("MONGO_URL is not defined in environment variables");
        }

        await mongoose.connect(env.MONGO_URL);
        console.log("MongoDB Connection successful");

        app.listen(env.PORT, () => {
        console.log(`Server running at http://localhost:${env.PORT}`);
        });
    } catch (err: any) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

main();