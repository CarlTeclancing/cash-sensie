import express from "express";
import {
  addTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  getTransactionById,
  getSummary,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/auth.js";
const transactionRouter = express.Router();
transactionRouter.post("/", authMiddleware, addTransaction);
transactionRouter.get("/", authMiddleware, getTransactions);
transactionRouter.get("/summary/data", authMiddleware, getSummary);
transactionRouter.get("/:id", authMiddleware, getTransactionById);
transactionRouter.put("/:id", authMiddleware, editTransaction);
transactionRouter.delete("/:id", authMiddleware, deleteTransaction);
export default transactionRouter;
