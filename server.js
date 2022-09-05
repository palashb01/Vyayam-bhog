import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";
import productRouter from "./routes/productRoutes.js";
import catergoryRouter from "./routes/categoryRoutes.js";
import catchAllRouter from "./routes/catchAllRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/auth", authRouter);
//app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/vendor", vendorRouter);
app.use("/category", catergoryRouter);
app.use("*", catchAllRouter);

mongoose.connect(MONGO_URI, (res) => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).then(res => console.log("res")).catch(err => console.error(err));
  