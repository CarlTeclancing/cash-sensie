import express from "express";
import {
  addTax,
  getTaxes,
  editTax,
  deleteTax,
} from "../controllers/taxController.js";
import authMiddleware from "../middleware/auth.js";

const taxRouter = express.Router();

taxRouter.post("/", authMiddleware, addTax);
taxRouter.get("/", authMiddleware, getTaxes);
taxRouter.put("/:id", authMiddleware, editTax);
taxRouter.delete("/:id", authMiddleware, deleteTax);

export default taxRouter;
