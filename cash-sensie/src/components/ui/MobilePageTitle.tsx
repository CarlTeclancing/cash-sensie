import React from "react";
import { COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";



const MobilePageTitle = ({ title} : {title: string}) => {
  const { isDarkMode, toggleAddTransactionsForm } = useAppStore();
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_SIZE;
  return (
    <div className="w-11/12 items-center py-3 justify-between flex">
      <span
        className="text-xl font-bold"
        style={{
          color: isDarkMode ? COLORS.white : COLORS.black,
        }}
      >
        {title}
      </span>
      <button
        onClick={toggleAddTransactionsForm}
        className="p-2 text-sm rounded"
        style={{
          backgroundColor: COLORS.red,
          color: COLORS.white,
        }}
      >
        Add Transactions
      </button>
    </div>
  );
};

export default MobilePageTitle;
