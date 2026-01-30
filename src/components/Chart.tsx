import React from "react";
import Bar from "./Bar";
import { useAppStore } from "../store/store";
import { COLORS, DARK_MODE_COLORS } from "../constants/constants";
import bars from "../assets/blue-bars-icon.png";
import barsDark from "../assets/blue-bars-icon-dark.png"

const Chart = () => {
  const { isDarkMode } = useAppStore();
  return (
    <div
      className="p-10 rounded-xl hidden md:flex flex-col gap-4"
      style={{
        backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
      }}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <span
            className="text-xs"
            style={{
              color: COLORS.grey,
            }}
          >
            Total Savings
          </span>
          <span
            className="text-2xl font-bold"
            style={{
              color: `${isDarkMode ? COLORS.white : COLORS.black}`,
            }}
          >
            $682.5
          </span>
        </div>
        <div
          className="w-8 h-8 rounded"
          style={{
            backgroundColor: `${COLORS.background}`,
          }}
        >
          <img src={isDarkMode ? barsDark : bars} className="w-full h-full" />
        </div>
      </div>
      <div className="flex items-center w-full gap-3">
        <svg width="100%" height="2" className="flex-1">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke={isDarkMode? DARK_MODE_COLORS.blue : COLORS.blue}
            strokeWidth="1"
            strokeDasharray="10 5"
          />
        </svg>

        <span className=" text-xs font-bold whitespace-nowrap" style={{
          color: `${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`
        }}>
          $179
        </span>
      </div>
      <div className="flex items-center justify-center gap-10">
        <Bar content="Mon" value={50} max={100} />
        <Bar content="Mon" value={20} max={100} />
        <Bar content="Mon" value={10} max={100} />
        <Bar content="Mon" value={50} max={100} />
        <Bar content="Mon" value={90} max={100} />
        <Bar content="Mon" value={15} max={100} />
        <Bar content="Mon" value={50} max={100} />
        <Bar content="Mon" value={20} max={100} />
        <Bar content="Mon" value={10} max={100} />
        <Bar content="Mon" value={50} max={100} />
        <Bar content="Mon" value={90} max={100} />
        <Bar content="Mon" value={15} max={100} />
      </div>
    </div>
  );
};

export default Chart;
