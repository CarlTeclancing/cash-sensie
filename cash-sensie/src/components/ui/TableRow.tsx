import { useEffect, useRef, useState } from "react";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import ArrowUpIcon from "../../assets/arrow-up.png";
import ArrowDownIcon from "../../assets/arrow-down.png";
import ActionIcon from "../../assets/action-icon.png";
import ActionIconDark from "../../assets/action-icon-darkmode.png";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";

type props = {
  id: string;
  icon: React.ReactNode;
  title: string;
  date: string;
  type: "Debit" | "Saving";
  amount: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLast?: boolean;
};

const TableRow = (props: props) => {
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
      className="w-full flex items-center  py-3 px-2 text-sm cursor-pointer"
      onClick={() => isMobile && setMenuOpen((prev) => !prev)}
    >
      <div className="w-1/6 md:w-1/12 flex justify-center">
        <div
          className="rounded-full p-1 items-center justify-center flex"
          style={{
            backgroundColor: isDarkMode ? COLORS.white : COLORS.background,
          }}
        >
          {props.icon}
        </div>
      </div>
      <div className="w-3/6 md:w-3/12 items-center flex justify-center">
        <span
          className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {props.title}
        </span>
      </div>

      <div className="w-0  md:w-1/6 items-center justify-center hidden md:flex">
        <span
          style={{
            color: COLORS.grey,
          }}
        >
          {props.date}
        </span>
      </div>

      <div className="w-1/3 md:w-1/6 items-center justify-center  gap-1 flex">
        <span
          className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
          style={{
            color: `${isMobile ? (props.type.toLocaleLowerCase() === "debit" ? COLORS.red : COLORS.green) : isDarkMode ? COLORS.white : COLORS.black}`,
          }}
        >
          {props.type.toLowerCase() === "debit"
            ? `${props.amount}`
            : `${props.amount}`}
        </span>
        {!isMobile &&
          (props.type.toLowerCase() === "debit" ? (
            <div className="flex items-center ">
              <img src={ArrowUpIcon} alt="arrow up" className="w-3 h-6 ml-3" />
            </div>
          ) : (
            <div className="flex items-center">
              <img src={ArrowDownIcon} alt="arrow down" className="w-6 h-6" />
            </div>
          ))}
      </div>
      <div className="w-0 md:w-1/6 items-center justify-center  hidden md:flex">
        <span
          className="font-semibold"
          style={{
            color:
              props.type.toLowerCase() === "debit" ? COLORS.red : COLORS.green,
          }}
        >
          {props.type}
        </span>
      </div>
      <div
        className="w-0 md:w-1/6 flex items-center justify-center relative"
        ref={menuRef}
      >
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
            className="w-8 h-8"
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
                  : props.isLast
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
                  props.onEdit?.(props.id);
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
                  props.onDelete?.(props.id);
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

export default TableRow;
