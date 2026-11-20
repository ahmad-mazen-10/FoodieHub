import colors from "colors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { DB_Connect } from "./config/dbConnect";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import passwordRouter from "./routes/passwordRoutes";
import restaurantRouter from "./routes/restaurantRoutes";
import categoryRouter from "./routes/categoryRoutes";
import foodRouter from "./routes/foodRoutes";

dotenv.config();
const port = process.env.PORT || 8000;
DB_Connect();

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/password", passwordRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/food", foodRouter);

app.get("/", (req: any, res: any) => {
  return res.status(200).send("Hello, World!");
});

app.listen(port, () => {
  console.log(colors.bgMagenta(`Server is running on port ${port}`));
});
