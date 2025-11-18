import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";

app.use("/api/auth", authRouter);

export { app };
