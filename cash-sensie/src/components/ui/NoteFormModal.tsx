import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "../../store/store";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { X } from "lucide-react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";
import leftArrow from "../../assets/left-arrow.png";
import { useState, useEffect } from "react";

export type NoteFormData = {
  id?: string;
  title: string;
  content: string;
};

type NoteFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit" | "view";
  initialData: NoteFormData | null;
  onClose: () => void;
  onSave: (data: NoteFormData) => void;
};

const NoteFormModal = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
}: NoteFormModalProps) => {
  const { isDarkMode } = useAppStore();
  const { width, height } = useWindowSize();
  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        content: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    if (formData.title.trim() && formData.content.trim()) {
      onSave(formData);
    }
  };

  const isValid = formData.title.trim() && formData.content.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="w-screen h-dvh backdrop-opacity-80 backdrop-blur-sm flex items-baseline-last md:items-center md:justify-center fixed top-0 left-0 z-50 bg-black/50">
          <motion.div
            initial={
              width < MOBILE_SIZE
                ? {
                    y: height,
                  }
                : { opacity: 0, y: 20 }
            }
            animate={width < MOBILE_SIZE ? { y: 0 } : { opacity: 1, y: 0 }}
            exit={width < MOBILE_SIZE ? { y: height } : { opacity: 0, y: 20 }}
            transition={
              width < MOBILE_SIZE ? { duration: 0.2 } : { duration: 0.3 }
            }
            className="container relative w-full md:w-5/12"
          >
            <X
              onClick={onClose}
              size={30}
              className="shadow-[0_-8px_6px_-6px_rgba(0,0,0,0.9)] md:shadow-none absolute hidden md:flex cursor-pointer"
              style={{
                color: `${isDarkMode ? COLORS.white : COLORS.black}`,
                right: "-35px",
              }}
            />

            <div
              className={`rounded-t-2xl md:rounded-xl flex flex-col py-9 gap-7 ${
                mode === "view"
                  ? "max-h-[70dvh] overflow-y-auto items-center justify-start"
                  : "items-center justify-center"
              }`}
              style={{
                backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
                color: `${isDarkMode ? COLORS.white : COLORS.black}`,
              }}
            >
              <div className="container flex flex-col justify-center gap-6 w-11/12 md:w-10/12">
                <div className="md:hidden flex gap-2 items-center">
                  <div
                    className="md:hidden rounded-full p-2"
                    style={{
                      backgroundColor: `${COLORS.grey}`,
                    }}
                    onClick={onClose}
                  >
                    <img src={leftArrow} alt="" className="w-3 h-3" />
                  </div>

                  <span
                    className="font-semibold text-lg"
                    style={{
                      color: `${isDarkMode ? COLORS.white : COLORS.black}`,
                    }}
                  >
                    {mode === "add"
                      ? "Create Note"
                      : mode === "edit"
                        ? "Edit Note"
                        : "View Note"}
                  </span>
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label htmlFor="note-title">Note Title</label>
                  <input
                    type="text"
                    className="w-full focus:outline-none h-9 rounded-md px-2"
                    style={{
                      border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
                      backgroundColor: isDarkMode
                        ? DARK_MODE_COLORS.darkBlue
                        : COLORS.white,
                      color: isDarkMode ? COLORS.white : COLORS.black,
                    }}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    id="note-title"
                    placeholder="Enter note title"
                    readOnly={mode === "view"}
                  />
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label htmlFor="note-content">Note Content</label>
                  <textarea
                    className={`w-full focus:outline-none rounded-md px-2 py-2 resize-none ${mode === "view" ? "h-auto min-h-32" : "h-32"}`}
                    style={{
                      border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
                      backgroundColor: isDarkMode
                        ? DARK_MODE_COLORS.darkBlue
                        : COLORS.white,
                      color: isDarkMode ? COLORS.white : COLORS.black,
                    }}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    id="note-content"
                    placeholder="Enter note content"
                    readOnly={mode === "view"}
                    rows={
                      mode === "view"
                        ? Math.max(5, Math.ceil(formData.content.length / 50))
                        : undefined
                    }
                  />
                </div>

                <div className="flex w-full gap-3 pt-4">
                  {mode === "view" ? (
                    <button
                      className="w-full px-4 py-2 rounded-md font-semibold transition-all"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.blue
                          : COLORS.blue,
                        color: COLORS.white,
                      }}
                      onClick={onClose}
                    >
                      Close
                    </button>
                  ) : (
                    <>
                      <button
                        className="flex-1 px-4 py-2 rounded-md font-semibold transition-all"
                        style={{
                          backgroundColor: isDarkMode
                            ? DARK_MODE_COLORS.darkBlue
                            : COLORS.background,
                          color: isDarkMode ? COLORS.white : COLORS.black,
                          border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.grey}`,
                        }}
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        className="flex-1 px-4 py-2 rounded-md font-semibold transition-all"
                        style={{
                          backgroundColor: isValid
                            ? isDarkMode
                              ? DARK_MODE_COLORS.blue
                              : COLORS.blue
                            : COLORS.grey,
                          color: COLORS.white,
                          cursor: isValid ? "pointer" : "not-allowed",
                          opacity: isValid ? 1 : 0.6,
                        }}
                        onClick={handleSave}
                        disabled={!isValid}
                      >
                        {mode === "add" ? "Create" : "Save"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NoteFormModal;
