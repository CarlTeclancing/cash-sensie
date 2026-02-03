import { useEffect, useRef, useState } from "react";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import ActionIcon from "../../assets/action-icon.png";
import ActionIconDark from "../../assets/action-icon-darkmode.png";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";

export type TaxRowData = {
  id: string;
  title: string;
  description: string;
  amount: string;
  recurring: boolean;
};

type TaxRowProps = TaxRowData & {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLast?: boolean;
};

const TaxRow = ({
  id,
  title,
  description,
  amount,
  recurring,
  onEdit,
  onDelete,
  isLast,
}: TaxRowProps) => {
  const { isDarkMode } = useAppStore();
  const isMobile = useWindowSize().width <= MOBILE_SIZE;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      className="w-full flex items-center py-3 px-2 text-sm cursor-pointer"
      onClick={() => isMobile && setMenuOpen((prev) => !prev)}
    >
      <div className="w-4/12 md:w-3/12 flex justify-start">
        <span
          className="font-semibold"
          style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
        >
          {title}
        </span>
      </div>
      <div className="w-0 md:w-4/12 hidden md:flex justify-start">
        <span style={{ color: COLORS.grey }}>{description}</span>
      </div>
      <div className="w-4/12 md:w-2/12 flex justify-center">
        <span
          className="font-semibold"
          style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
        >
          {amount}
        </span>
      </div>
      <div className="w-4/12 md:w-2/12 flex justify-center">
        <span
          className="font-semibold"
          style={{ color: recurring ? COLORS.green : COLORS.red }}
        >
          {recurring ? "Yes" : "No"}
        </span>
      </div>
      <div className="w-0 md:w-1/12 flex justify-center relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="hidden md:block"
        >
          <img
            src={isDarkMode ? ActionIconDark : ActionIcon}
            alt="action icon"
            className="w-7 h-7"
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
                  : isLast
                    ? "right-0 bottom-full mb-2 w-32"
                    : "right-0 mt-2 w-32"
              }`}
              style={{
                backgroundColor: isMobile
                  ? isDarkMode
                    ? DARK_MODE_COLORS.darkBlue
                    : COLORS.white
                  : isDarkMode
                    ? COLORS.black
                    : COLORS.white,
                border: `1px solid ${isMobile ? (isDarkMode ? DARK_MODE_COLORS.blue : COLORS.grey) : COLORS.grey}`,
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
  );
};

export default TaxRow;
