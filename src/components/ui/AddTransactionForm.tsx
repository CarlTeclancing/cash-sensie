import { useState, useEffect, useRef } from "react";
import { useAppStore } from "../../store/store";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";
import leftArrow from "../../assets/left-arrow.png";
import "emoji-picker-element";

type TransactionData = {
  title: string;
  emoji: string;
  amount: number;
  category: string;
  date: string;
  note: string;
};

const AddTransactionForm = () => {
  const {
    isAddtransactionsFormVisible,
    isDarkMode,
    toggleAddTransactionsForm,
  } = useAppStore();
  const { width, height } = useWindowSize();
  const [transactionData, setTransactionData] = useState<TransactionData>({
    title: "",
    emoji: "",
    amount: 0,
    category: "",
    date: "",
    note: "",
  });

  return (
    <AnimatePresence>
      {isAddtransactionsFormVisible && (
        <div
          className={` w-screen h-[100dvh] backdrop-opacity-80 backdrop-blur-sm flex items-baseline-last md:items-center md:justify-center fixed top-0 left-0 z-50 bg-black/50 `}
        >
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
              onClick={toggleAddTransactionsForm}
              size={30}
              className=" shadow-[0_-8px_6px_-6px_rgba(0,0,0,0.9)] md:shadow-none  absolute hidden md:flex  cursor-pointer"
              style={{
                color: `${isDarkMode ? COLORS.white : COLORS.black}`,

                right: "-35px",
              }}
            />

            <div
              className="rounded-t-2xl  md:rounded-xl flex flex-col py-9 gap-7 items-center justify-center"
              style={{
                backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
                color: `${isDarkMode ? COLORS.white : COLORS.black}`,
              }}
            >
              <div className="container flex flex-col  justify-center gap-6 w-11/12 md:w-10/12">
                <div className="md:hidden flex gap-2 items-center ">
                  <div
                    className="md:hidden rounded-full p-2"
                    style={{
                      backgroundColor: `${COLORS.grey}`,
                    }}
                    onClick={toggleAddTransactionsForm}
                  >
                    <img src={leftArrow} alt="" className="w-3 h-3" />
                  </div>

                  <span
                    className="font-semibold text-lg"
                    style={{
                      color: `${isDarkMode ? COLORS.white : COLORS.black}`,
                    }}
                  >
                    Add Transaction
                  </span>
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label htmlFor="transaction-title">Transaction Title</label>
                  <input
                    type="text"
                    className="w-full focus:outline-none h-9 rounded-md px-2"
                    style={{
                      border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
                    }}
                    onChange={(e) => {
                      setTransactionData({
                        ...transactionData,
                        title: e.target.value,
                      });
                    }}
                    id="transaction-title"
                  />
                </div>

                <EmojiPickerWrapper
                  selectedEmoji={transactionData.emoji}
                  isDarkMode={isDarkMode}
                  onEmojiClick={(unicode: string) => {
                    setTransactionData({
                      ...transactionData,
                      emoji: unicode,
                    });
                  }}
                />

                <div className="flex w-full gap-2 flex-col">
                  <label htmlFor="transaction-type">Transaction Type</label>
                  <select
                    name="transaction-type"
                    id="transaction-type"
                    className="w-full focus:outline-none h-9 rounded-md px-2"
                    style={{
                      border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
                    }}
                    onChange={(e) => {
                      setTransactionData({
                        ...transactionData,
                        category: e.target.value,
                      });
                    }}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="w-full focus:outline-none h-9 rounded-md px-2"
                    name="amount"
                    id="amount"
                    style={{
                      border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
                    }}
                    onChange={(e) => {
                      setTransactionData({
                        ...transactionData,
                        amount: e.target.valueAsNumber,
                      });
                    }}
                  />
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label htmlFor="transaction-note">Transaction Note</label>
                  <textarea
                    style={{
                      border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
                    }}
                    name="transaction-note"
                    className="w-full focus:outline-none h-20 rounded-md px-2 resize-none"
                    id="transaction-note"
                    onChange={(e) => {
                      setTransactionData({
                        ...transactionData,
                        note: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
                <button
                  className="text-white rounded px-4 py-3 w-fit hover:scale-105 transition duration-200 ease-in-out"
                  style={{
                    backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
                  }}
                >
                  Create Transaction
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const EmojiPickerWrapper = ({
  onEmojiClick,
  isDarkMode,
  selectedEmoji,
}: {
  onEmojiClick: (unicode: string) => void;
  isDarkMode: boolean;
  selectedEmoji: string;
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pickerRef.current && isOpen) {
      // Check if picker already exists to avoid recreating
      if (pickerRef.current.querySelector("emoji-picker")) {
        return;
      }

      const picker = document.createElement("emoji-picker");

      // Apply theme and styling to emoji picker
      picker.style.width = "100%";
      picker.style.setProperty(
        "--background",
        isDarkMode ? "#000000" : "#FFFFFF",
      );
      picker.style.setProperty(
        "--border-color",
        isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue,
      );
      picker.style.setProperty(
        "--input-border-color",
        isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue,
      );
      picker.style.setProperty(
        "--input-font-color",
        isDarkMode ? "#FFFFFF" : "#000000",
      );
      picker.style.setProperty(
        "--input-placeholder-color",
        isDarkMode ? COLORS.grey : COLORS.headerGrey,
      );
      picker.style.setProperty("--input-border-radius", "0.375rem");

      if (isDarkMode) {
        picker.classList.add("dark");
      }

      const handleEmojiClick = (event: any) => {
        onEmojiClick(event.detail.unicode);
        setIsOpen(false);
      };

      picker.addEventListener("emoji-click", handleEmojiClick);

      pickerRef.current.appendChild(picker);

      return () => {
        picker.removeEventListener("emoji-click", handleEmojiClick);
        picker.remove();
      };
    }
  }, [isOpen, isDarkMode]);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Delay adding the listener to prevent immediate closing
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex w-full gap-2 flex-col relative" ref={containerRef}>
      <label>Select an Emoji</label>
      <button
        type="button"
        className="w-full focus:outline-none h-9 rounded-md px-2 flex items-center justify-between"
        style={{
          border: `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
          backgroundColor: isDarkMode
            ? DARK_MODE_COLORS.darkBlue
            : COLORS.white,
          color: isDarkMode ? COLORS.white : COLORS.black,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedEmoji || "Click to select an emoji"}</span>
        <span style={{ color: COLORS.grey }}>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full mt-1 z-50 rounded-md shadow-lg overflow-hidden"
          style={{
            backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
          }}
        >
          <div ref={pickerRef} style={{ width: "100%" }}></div>
        </div>
      )}
    </div>
  );
};

export default AddTransactionForm;
