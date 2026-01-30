import React from "react";
import { COLORS, DARK_MODE_COLORS } from "../constants/constants";
import { useAppStore } from "../store/store";
import bar1 from "../assets/bar-icon-1.png";
import bar2 from "../assets/bar-icon-2.png";
import bar3 from "../assets/bar-icon-3.png";
import bar4 from "../assets/bar-icon-4.png";
import bar5 from "../assets/bar-icon-5.png";
import darkBar1 from "../assets/bar-icon-dark-1.png";
import darkBar2 from "../assets/bar-icon-dark-2.png";
import darkBar3 from "../assets/bar-icon-dark-3.png";
import darkBar4 from "../assets/bar-icon-dark-4.png";
import darkBar5 from "../assets/bar-icon-dark-5.png";
import debitsBars from "../assets/debits-bar-icon.png";
import debitsLine from "../assets/debits-line-icon.png";
import blueBars from "../assets/blue-bars-icon.png";
import blueBarsDark from "../assets/blue-bars-icon-dark.png";
import totalSavedLine from "../assets/total-saved-line.png";
import { useWindowSize } from "../hooks/useWindowSize";
import { MOBILE_SIZE } from "../constants/constants";

const SummaryComp = () => {
  const { isDarkMode } = useAppStore();
  const { width } = useWindowSize();

  return (
    <div
      className="px-4 py-8 md:p-10 rounded-xl w-11/12  md:w-auto items-center justify-center md:items-start flex flex-col gap-4"
      style={{
        backgroundColor: `${isDarkMode ? (width < MOBILE_SIZE ? DARK_MODE_COLORS.background : DARK_MODE_COLORS.darkBlue) : width < MOBILE_SIZE ? COLORS.background : COLORS.white}`,
      }}
    >
      {!(width < MOBILE_SIZE) && (
        <span
          style={{
            color: isDarkMode ? COLORS.grey : COLORS.black,
          }}
          className="text-xl font-semibold"
        >
          Summary
        </span>
      )}
      <div
        className="flex gap-6 w-full  p-6 rounded-xl bg-white"
        style={{
          border: ` ${width < MOBILE_SIZE ? "none" : `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`}`,
        }}
      >
        <div className="flex flex-col">
          <span
            className="text-xs"
            style={{
              color: COLORS.grey,
            }}
          >
            Spent This Month
          </span>
          <span
            className="text-xl font-bold"
            style={{
              color: `${COLORS.black}`,
            }}
          >
            $682.5
          </span>
        </div>
        <div className="flex gap-2.5">
          <img src={isDarkMode ? darkBar1 : bar1} alt="" />
          <img src={isDarkMode ? darkBar2 : bar2} alt="" />
          <img src={isDarkMode ? darkBar3 : bar3} alt="" />
          <img src={isDarkMode ? darkBar4 : bar4} alt="" />
          <img src={isDarkMode ? darkBar5 : bar5} alt="" />
        </div>
      </div>
      <div
        className="flex gap-6 p-3  w-full py-6 rounded-xl bg-white"
        style={{
          border: ` ${width < MOBILE_SIZE ? "none" : `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`}`,
        }}
      >
        <div
          className="rounded-full w-15  h-15 flex items-center justify-center"
          style={{
            backgroundColor: COLORS.background,
          }}
        >
          <img src={debitsBars} />
        </div>
        <div className="flex flex-col">
          <span
            className="text-xs"
            style={{
              color: COLORS.grey,
            }}
          >
            Debits
          </span>
          <span
            className="text-xl font-bold"
            style={{
              color: `${COLORS.black}`,
            }}
          >
            $682.5
          </span>
        </div>
        <img src={debitsLine} />
      </div>
      <div
        className="flex gap-6 w-full p-3  py-6 rounded-xl bg-white"
        style={{
          border: ` ${width < MOBILE_SIZE ? "none" : `1px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`}`,
        }}
      >
        <div
          className="rounded-full w-15  h-15 flex items-center justify-center"
          style={{
            backgroundColor: COLORS.background,
          }}
        >
          <img
            className="w-2/3 h-2/3"
            src={isDarkMode ? blueBarsDark : blueBars}
          />
        </div>
        <div className="flex flex-col">
          <span
            className="text-xs"
            style={{
              color: COLORS.grey,
            }}
          >
            Savings
          </span>
          <span
            className="text-2xl font-bold"
            style={{
              color: `${COLORS.black}`,
            }}
          >
            $682.5
          </span>
        </div>
      </div>
      <div
        className="flex gap-8 p-6 w-full  rounded-xl bg-white"
        style={{
          background: `linear-gradient(135deg, #868CFF 0%, ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue} 100%)`,
        }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="text-xs"
            style={{
              color: COLORS.background,
            }}
          >
            Total Saved
          </span>
          <span
            className="text-2xl font-semibold"
            style={{
              color: `${COLORS.white}`,
            }}
          >
            $682.5
          </span>
        </div>
        <img src={totalSavedLine} />
      </div>
    </div>
  );
};

export default SummaryComp;
