import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import leftArrow from "../../assets/left-arrow.png";
import {
  COLORS,
  DARK_MODE_COLORS,
  MOBILE_SIZE,
} from "../../constants/constants";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAppStore } from "../../store/store";

export type TaxFormData = {
  id?: string;
  title: string;
  description: string;
  amount: string;
  recurring: boolean;
};

type TaxFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  initialData?: TaxFormData | null;
  onClose: () => void;
  onSave: (data: TaxFormData) => void;
};

const emptyForm: TaxFormData = {
  title: "",
  description: "",
  amount: "",
  recurring: false,
};

const TaxFormModal = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
}: TaxFormModalProps) => {
  const { isDarkMode } = useAppStore();
  const { width, height } = useWindowSize();
  const [formData, setFormData] = useState<TaxFormData>(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ?? emptyForm);
    }
  }, [isOpen, initialData]);

  const isValid = formData.title.trim() && formData.amount.trim();

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
              className="rounded-t-2xl md:rounded-xl flex flex-col py-9 gap-7 items-center justify-center"
              style={{
                backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
                color: `${isDarkMode ? COLORS.white : COLORS.black}`,
              }}
            >
              <div className="container flex flex-col justify-center gap-6 w-11/12 md:w-10/12">
                <div className="md:hidden flex gap-2 items-center">
                  <div
                    className="md:hidden rounded-full p-2"
                    style={{ backgroundColor: `${COLORS.grey}` }}
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
                    {mode === "add" ? "Add Tax" : "Edit Tax"}
                  </span>
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full focus:outline-none h-9 rounded-md px-2"
                    style={{
                      border: `1px solid ${
                        isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                      }`,
                    }}
                  />
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full focus:outline-none rounded-md px-2 py-2"
                    rows={3}
                    style={{
                      border: `1px solid ${
                        isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                      }`,
                    }}
                  />
                </div>

                <div className="flex w-full gap-2 flex-col">
                  <label>Amount</label>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    placeholder="$0.00"
                    className="w-full focus:outline-none h-9 rounded-md px-2"
                    style={{
                      border: `1px solid ${
                        isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                      }`,
                    }}
                  />
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.recurring}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recurring: e.target.checked,
                      }))
                    }
                  />
                  Recurring
                </label>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    className="px-4 py-2 rounded-md"
                    style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-md font-semibold"
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
                    disabled={!isValid}
                    onClick={() => onSave(formData)}
                  >
                    {mode === "add" ? "Add Tax" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaxFormModal;
