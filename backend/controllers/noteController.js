import noteModel from "../model/noteModel.js";

const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const note = new noteModel({ userId, title, content });
    await note.save();

    return res.status(201).json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    console.error("Add note error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await noteModel.find({ userId }).sort({ updatedAt: -1 });

    return res.json({ success: true, notes });
  } catch (error) {
    console.error("Get notes error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await noteModel.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.json({ success: true, note });
  } catch (error) {
    console.error("Get note by id error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    const note = await noteModel.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (typeof title === 'string') note.title = title;
    if (typeof content === 'string') note.content = content;

    await note.save();

    return res.json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    console.error("Edit note error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await noteModel.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addNote, getNotes, getNoteById, editNote, deleteNote };
