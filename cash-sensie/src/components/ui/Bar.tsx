import React from "react";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import { motion } from "framer-motion";

type vals = {
  value: number;
  max: number;
  content: string;
};

const Bar = ({ value, max, content }: vals) => {
  const { isDarkMode } = useAppStore();
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full">
      <div
        className=" w-6 rounded-md flex justify-end items-end flex-1"
        style={{
          backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.background : COLORS.background}`,
        }}
      >
        <motion.div
          className="w-full rounded-md"
          initial={{ height: `0%` }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            backgroundColor: `${value / max <= 0.25 ? COLORS.red : isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
          }}
        ></motion.div>
      </div>
      <span
        className="text-xs"
        style={{
          color: `${isDarkMode ? COLORS.white : COLORS.grey}`,
        }}
      >
        {content}
      </span>
    </div>
  );
};

export default Bar;
