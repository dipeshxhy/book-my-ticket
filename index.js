import "dotenv/config";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { connectDb } from "./db/index.js";

import adminRoutes from "./modules/admin/adminRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import seatRoutes from "./modules/seats/seatRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 8080;
import { errorHandler } from "./common/middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { authenticated, authorized } from "./common/middleware/authenticate.js";

const app = express();
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  credentials: true,
};

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/admin", authenticated, authorized("admin"), adminRoutes);
app.use("/seats", seatRoutes);

app.use(errorHandler);
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
