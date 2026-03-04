import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { addNote, getNotes, getNoteById, editNote, deleteNote } from '../controllers/noteController.js'

const noteRouter = express.Router()

noteRouter.post('/', authMiddleware, addNote)
noteRouter.get('/', authMiddleware, getNotes)
noteRouter.get('/:id', authMiddleware, getNoteById)
noteRouter.put('/:id', authMiddleware, editNote)
noteRouter.delete('/:id', authMiddleware, deleteNote)

export default noteRouter
