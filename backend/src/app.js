import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { updateUserProfile } from "../controllers/user.controller.js"; 
const app = express();
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.put("/api/user/:id/update-profile", updateUserProfile); 
export { app };
