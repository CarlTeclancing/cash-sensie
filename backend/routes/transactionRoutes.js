import express from "express";
import {
  addTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  getTransactionById,
  getSummary,
  getDashboardSummary,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/auth.js";

const transactionRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - category
 *         - type
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the transaction
 *         amount:
 *           type: number
 *           description: The amount of the transaction
 *         category:
 *           type: string
 *           description: The category of the transaction
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: The type of the transaction
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the transaction
 *         description:
 *           type: string
 *           description: The description of the transaction
 *         userId:
 *           type: string
 *           description: The user ID associated with the transaction
 *       example:
 *         id: 60d5ecb74b24c72b8c8b4567
 *         amount: 100.50
 *         category: Food
 *         type: expense
 *         date: 2023-06-25
 *         description: Lunch at restaurant
 *         userId: 60d5ecb74b24c72b8c8b4568
 *     Summary:
 *       type: object
 *       properties:
 *         totalIncome:
 *           type: number
 *         totalExpense:
 *           type: number
 *         balance:
 *           type: number
 *       example:
 *         totalIncome: 5000
 *         totalExpense: 3000
 *         balance: 2000
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management API
 */

/**
 * @swagger
 * /api/transaction:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction added successfully
 *       401:
 *         description: Unauthorized
 */
transactionRouter.post("/", authMiddleware, addTransaction);

/**
 * @swagger
 * /api/transaction:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 */
transactionRouter.get("/", authMiddleware, getTransactions);

/**
 * @swagger
 * /api/transaction/summary/data:
 *   get:
 *     summary: Get transaction summary
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction summary
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 *       401:
 *         description: Unauthorized
 */
transactionRouter.get("/summary/data", authMiddleware, getSummary);

/**
 * @swagger
 * /api/transaction/dashboard-summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 *       401:
 *         description: Unauthorized
 */
transactionRouter.get(
  "/dashboard-summary",
  authMiddleware,
  getDashboardSummary,
);

/**
 * @swagger
 * /api/transaction/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
transactionRouter.get("/:id", authMiddleware, getTransactionById);

/**
 * @swagger
 * /api/transaction/{id}:
 *   put:
 *     summary: Update transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
transactionRouter.put("/:id", authMiddleware, editTransaction);

/**
 * @swagger
 * /api/transaction/{id}:
 *   delete:
 *     summary: Delete transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
transactionRouter.delete("/:id", authMiddleware, deleteTransaction);

export default transactionRouter;
