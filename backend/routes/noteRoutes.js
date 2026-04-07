import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addNote,
  getNotes,
  getNoteById,
  editNote,
  deleteNote,
} from "../controllers/noteController.js";

const noteRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the note
 *         title:
 *           type: string
 *           description: The title of the note
 *         content:
 *           type: string
 *           description: The content of the note
 *         userId:
 *           type: string
 *           description: The user ID associated with the note
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the note
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the note
 *       example:
 *         id: 60d5ecb74b24c72b8c8b4567
 *         title: My Note
 *         content: This is the content of my note
 *         userId: 60d5ecb74b24c72b8c8b4568
 *         createdAt: 2023-06-25T10:00:00.000Z
 *         updatedAt: 2023-06-25T10:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management API
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Add a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Note added successfully
 *       401:
 *         description: Unauthorized
 */
noteRouter.post("/", authMiddleware, addNote);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized
 */
noteRouter.get("/", authMiddleware, getNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
noteRouter.get("/:id", authMiddleware, getNoteById);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
noteRouter.put("/:id", authMiddleware, editNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
noteRouter.delete("/:id", authMiddleware, deleteNote);

export default noteRouter;
