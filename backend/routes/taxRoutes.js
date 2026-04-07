import express from "express";
import {
  addTax,
  getTaxes,
  editTax,
  deleteTax,
} from "../controllers/taxController.js";
import authMiddleware from "../middleware/auth.js";

const taxRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tax:
 *       type: object
 *       required:
 *         - name
 *         - rate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the tax
 *         name:
 *           type: string
 *           description: The name of the tax
 *         rate:
 *           type: number
 *           description: The tax rate (percentage)
 *         userId:
 *           type: string
 *           description: The user ID associated with the tax
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the tax
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the tax
 *       example:
 *         id: 60d5ecb74b24c72b8c8b4567
 *         name: VAT
 *         rate: 20
 *         userId: 60d5ecb74b24c72b8c8b4568
 *         createdAt: 2023-06-25T10:00:00.000Z
 *         updatedAt: 2023-06-25T10:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Taxes
 *   description: Tax management API
 */

/**
 * @swagger
 * /api/taxes:
 *   post:
 *     summary: Add a new tax
 *     tags: [Taxes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tax'
 *     responses:
 *       201:
 *         description: Tax added successfully
 *       401:
 *         description: Unauthorized
 */
taxRouter.post("/", authMiddleware, addTax);

/**
 * @swagger
 * /api/taxes:
 *   get:
 *     summary: Get all taxes
 *     tags: [Taxes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of taxes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tax'
 *       401:
 *         description: Unauthorized
 */
taxRouter.get("/", authMiddleware, getTaxes);

/**
 * @swagger
 * /api/taxes/{id}:
 *   put:
 *     summary: Update tax by ID
 *     tags: [Taxes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tax ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tax'
 *     responses:
 *       200:
 *         description: Tax updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tax not found
 */
taxRouter.put("/:id", authMiddleware, editTax);

/**
 * @swagger
 * /api/taxes/{id}:
 *   delete:
 *     summary: Delete tax by ID
 *     tags: [Taxes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tax ID
 *     responses:
 *       200:
 *         description: Tax deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tax not found
 */
taxRouter.delete("/:id", authMiddleware, deleteTax);

export default taxRouter;
