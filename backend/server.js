import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import transactionRouter from "./routes/transactionRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import taxRouter from "./routes/taxRoutes.js";
//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();


app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/taxes", taxRouter);
app.use("/api/notes", noteRouter);
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log("server started on PORT:" + port);
});
