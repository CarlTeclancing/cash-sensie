import { useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import NoteCard from "../components/ui/NoteCard";
import NoteFormModal, {
  type NoteFormData,
} from "../components/ui/NoteFormModal";
import { useWindowSize } from "../hooks/useWindowSize";
import { MOBILE_SIZE, COLORS, DARK_MODE_COLORS } from "../constants/constants";
import { useAppStore } from "../store/store";
import { Plus } from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
};

const Notes = () => {
  const { width } = useWindowSize();
  const { isDarkMode } = useAppStore();
  const isMobile = width <= MOBILE_SIZE;
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Shopping List",
      content:
        "Remember to buy milk, eggs, bread, and some vegetables for dinner. Don't forget to check the pantry before going out.",
    },
    {
      id: "2",
      title: "Budget Tips",
      content:
        "Track all expenses this month. Review subscriptions and cancel unused ones. Set a monthly budget for entertainment.",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedNote, setSelectedNote] = useState<NoteFormData | null>(null);

  const handleAddNote = () => {
    setModalMode("add");
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleViewNote = (id: string) => {
    const note = notes.find((item) => item.id === id);
    if (note) {
      setSelectedNote(note);
      setModalMode("view");
      setIsModalOpen(true);
    }
  };

  const handleEditNote = (id: string) => {
    const note = notes.find((item) => item.id === id);
    if (note) {
      setSelectedNote(note);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleSaveNote = (data: NoteFormData) => {
    if (modalMode === "add") {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: data.title,
        content: data.content,
      };
      setNotes((prev) => [newNote, ...prev]);
    } else if (data.id) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === data.id
            ? {
                ...note,
                title: data.title,
                content: data.content,
              }
            : note,
        ),
      );
    }

    setIsModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="py-8 md:px-5 w-full flex flex-col gap-6 items-center justify-center">
      {isMobile ? (
        <div className="w-11/12 flex items-center justify-between">
          <span
            className="text-xl font-bold"
            style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
          >
            Notes
          </span>
          <button
            onClick={handleAddNote}
            className="px-4 py-2 rounded-md text-sm font-semibold"
            style={{
              backgroundColor: isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue,
              color: COLORS.white,
            }}
          >
            Add Note
          </button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between px-6">
          <div className="w-10/12">
            <PageTitle title="Notes" />
          </div>
          <div className="w-1/12">
            <button
              onClick={handleAddNote}
              className="px-4 m py-2 rounded-md text-sm font-semibold cursor-pointer"
              style={{
                backgroundColor: isDarkMode
                  ? DARK_MODE_COLORS.blue
                  : COLORS.blue,
                color: COLORS.white,
              }}
            >
              <span>Add Note</span>
            </button>
          </div>
        </div>
      )}

      {notes.length === 0 ? (
        <div
          className="w-full flex items-center justify-center py-12"
          style={{ color: COLORS.grey }}
        >
          <p>No notes yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="w-11/12 md:w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onView={handleViewNote}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}

      <NoteFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedNote}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default Notes;
