import React from "react";
import TableRow from "./TableRow";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";

const tableData: Array<{
  id: string;
  icon: string;
  title: string;
  date: string;
  type: "Debit" | "Saving";
  amount: string;
}> = [
  {
    id: "1",
    icon: "💳",
    title: "Grocery Shopping",
    date: "2024-01-15",
    type: "Debit",
    amount: "-$45.50",
  },
  {
    id: "2",
    icon: "💰",
    title: "Monthly Savings",
    date: "2024-01-10",
    type: "Saving",
    amount: "+$500.00",
  },
  {
    id: "3",
    icon: "🎬",
    title: "Movie Tickets",
    date: "2024-01-12",
    type: "Debit",
    amount: "-$30.00",
  },
];

const Table = () => {
  const { isDarkMode } = useAppStore();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= MOBILE_SIZE;

  return (
    <div className="md:w-full w-11/12 flex items-center justify-center ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex">
          <div className="w-1/6 md:w-1/12 flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Icon
            </span>
          </div>
          <div className="w-3/6 md:w-3/12 flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Title
            </span>
          </div>
          <div className="w-0 md:w-1/6 hidden  md:flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Date
            </span>
          </div>
          <div className="w-1/3 md:w-1/6 flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Amount
            </span>
          </div>
          <div className="w-0 md:w-1/6 hidden  md:flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Type
            </span>
          </div>
          <div className="w-0 md:w-1/6 hidden  md:flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Action
            </span>
          </div>
        </div>
        <div
          className="flex flex-col gap-2 rounded-xl py-4"
          style={{
            backgroundColor: isDarkMode
              ? isMobile
                ? DARK_MODE_COLORS.background
                : DARK_MODE_COLORS.darkBlue
              : isMobile
                ? COLORS.background
                : COLORS.white,
          }}
        >
          {tableData.map((row) => (
            <TableRow key={row.id} {...row} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
