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
import farmerRouter from "./routes/farmer.route.js";
import userRouter from "./routes/user.route.js";
import distributorRouter from "./routes/distributor.route.js";
import retailerRouter from "./routes/retailer.route.js";
import uploadRouter from "./routes/upload.route.js";
import adminRouter from "./routes/admin.route.js";

app.use("/api/auth", authRouter);
app.use("/api/farmer", farmerRouter);
app.use('/api/user', userRouter);
app.use("/api/distributor", distributorRouter);
app.use("/api/retailer", retailerRouter);
app.use("/api/admin",adminRouter);
app.use("/api/upload", uploadRouter);

export { app };
