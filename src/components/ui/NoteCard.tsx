import { useEffect, useRef, useState } from "react";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import ActionIcon from "../../assets/action-icon.png";
import ActionIconDark from "../../assets/action-icon-darkmode.png";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";

export type NoteCardData = {
  id: string;
  title: string;
  content: string;
};

type NoteCardProps = NoteCardData & {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
};

const NoteCard = ({
  id,
  title,
  content,
  onEdit,
  onDelete,
  onView,
}: NoteCardProps) => {
  const { isDarkMode } = useAppStore();
  const isMobile = useWindowSize().width <= MOBILE_SIZE;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const preview = content.substring(0, 100);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className="relative p-4 rounded-lg h-40 cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col justify-between group"
      style={{
        backgroundColor: isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white,
        border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.grey}`,
      }}
      ref={menuRef}
      onClick={() => {
        if (isMobile) {
          setMenuOpen((prev) => !prev);
        } else {
          onView?.(id);
        }
      }}
    >
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <h3
          className="font-semibold text-lg mb-2"
          style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
        >
          {title}
        </h3>
        <p
          className="text-sm line-clamp-2"
          style={{ color: isDarkMode ? COLORS.grey : COLORS.grey }}
        >
          {preview}
          {content.length > 100 ? "..." : ""}
        </p>
      </div>

      {/* Hover action buttons */}
      <div className="absolute top-3 right-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isMobile) {
                setMenuOpen((prev) => !prev);
              }
            }}
            className="hidden md:block"
          >
            <img
              src={isDarkMode ? ActionIconDark : ActionIcon}
              alt="action icon"
              className="w-6 h-6"
            />
          </button>
          {menuOpen && (
            <>
              {isMobile && (
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                  }}
                />
              )}
              <div
                className={`absolute rounded-xl shadow-xl z-50 ${
                  isMobile
                    ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed w-64 p-6"
                    : "right-0 bottom-full mb-2 w-32"
                }`}
                style={{
                  backgroundColor: isDarkMode
                    ? DARK_MODE_COLORS.darkBlue
                    : COLORS.white,
                  border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.grey}`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {isMobile && (
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
                  >
                    Options
                  </h3>
                )}
                <button
                  className={`w-full text-left font-medium transition-all ${
                    isMobile ? "py-3 px-4 rounded-lg mb-2" : "px-3 py-2 text-sm"
                  }`}
                  style={{
                    color: isDarkMode ? COLORS.white : COLORS.black,
                    backgroundColor: isMobile
                      ? isDarkMode
                        ? COLORS.black
                        : COLORS.background
                      : "transparent",
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                    onView?.(id);
                  }}
                >
                  View Note
                </button>
                <button
                  className={`w-full text-left font-medium transition-all ${
                    isMobile ? "py-3 px-4 rounded-lg mb-2" : "px-3 py-2 text-sm"
                  }`}
                  style={{
                    color: isDarkMode ? COLORS.white : COLORS.black,
                    backgroundColor: isMobile
                      ? isDarkMode
                        ? COLORS.black
                        : COLORS.background
                      : "transparent",
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit?.(id);
                  }}
                >
                  Edit
                </button>
                <button
                  className={`w-full text-left font-medium transition-all ${
                    isMobile ? "py-3 px-4 rounded-lg" : "px-3 py-2 text-sm"
                  }`}
                  style={{
                    color: COLORS.red,
                    backgroundColor: isMobile
                      ? isDarkMode
                        ? COLORS.black
                        : COLORS.background
                      : "transparent",
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(id);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
