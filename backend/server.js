import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./route/UserRoute.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

dotenv.config(); // Make sure to configure dotenv before using environment variables

mongoose
  .connect(process.env.Mongo_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `DB connected successfully and listening to port : ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// base routes
app.use("/api/user", userRoutes);
