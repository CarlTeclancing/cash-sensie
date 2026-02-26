import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import transactionRouter from "./routes/transactionRoutes.js";
//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
// MIDDLEWARES

app.use(express.json());
app.use(cors());
// api endpoints
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log("server started on PORT:" + port);
});
