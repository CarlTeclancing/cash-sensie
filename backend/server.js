import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import transactionRouter from "./routes/transactionRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import taxRouter from "./routes/taxRoutes.js";

import swaggerJsdoc from "swagger-jsdoc";

import swaggerUi from 'swagger-ui-express'
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

const options ={
  definition:{
    openapi:"3.0.0",
    info:{
      title:" Cash sensei Expense Tracker API",
      version:"1.0.0",
      description:"A simple Express Expense Tracker API"
    },
    servers:[
      {
        url:"http://localhost:4000/"
      },
    ],
  },
  apis:['./routes/*.js']
}

const specs = swaggerJsdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log("server started on PORT:" + port);
});
