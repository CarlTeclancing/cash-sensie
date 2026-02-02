import React, { type CSSProperties } from "react";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useLocation } from "react-router";
import { Search, Plus } from "lucide-react";
import { useAppStore } from "../../store/store";
import pict from "../../assets/Avatar.png";
import mimLogo from "../../assets/mini-logo.png";
import miniDarkLogo from "../../assets/mini-logo-dark.png";
import { MOBILE_SIZE } from "../../constants/constants";
import { useWindowSize } from "../../hooks/useWindowSize";

const Header = () => {
  const { width } = useWindowSize();
  const { isDarkMode, toggleAddTransactionsForm } = useAppStore();
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const arrangedPage = page[0]?.toUpperCase() + page.slice(1).toLowerCase();
  return (
    <div
      className="w-full md:w-4/5 flex justify-between px-4 py-4 items-center border-b border-b-grey fixed top-0 right-0  z-20"
      style={{
        backgroundColor: `${isDarkMode ? (width < 768 ? DARK_MODE_COLORS.darkBlue : DARK_MODE_COLORS.background) : width < 768 ? COLORS.white : COLORS.background}`,
        borderBottomColor: `${isDarkMode ? COLORS.grey : COLORS.blue}`,
      }}
    >
      <div>
        <div className="md:flex  hidden flex-col">
          <span
            className="text-sm font-semibold"
            style={{
              color: `${isDarkMode ? COLORS.white : COLORS.headerGrey}`,
            }}
          >
            Hi Yuven Carlson!
          </span>
          <span
            className="text-3xl font-medium"
            style={{
              color: `${isDarkMode ? COLORS.white : COLORS.black}`,
            }}
          >
            {page.length === 0 ? "Dashboard" : arrangedPage}
          </span>
        </div>
        <div className="flex md:hidden">
          <img src={isDarkMode ? miniDarkLogo : mimLogo} alt="" />
        </div>
      </div>
      <div className="flex md:hidden w-5/9 items-center relative">
        <Search color={COLORS.grey} size={18} className="absolute left-3" />
        <input
          type="search"
          name="search"
          id="search"
          className={`bg-white w-full h-10 rounded-lg pl-10`}
          style={
            {
              color: COLORS.black,
              backgroundColor: `${width < MOBILE_SIZE ? COLORS.background : COLORS.white}`,
              "--autofill-color": COLORS.grey,
            } as CSSProperties
          }
          placeholder="Search..."
        />
      </div>
      <img
        src={pict}
        alt="Avatar"
        className="w-13 h-13 md:hidden rounded-full"
      />

      <div className="md:flex justify-between hidden  md:gap-14  items-center">
        <div className="flex items-center relative">
          <Search color={COLORS.grey} size={18} className="absolute left-3" />
          <input
            type="search"
            name="search"
            id="search"
            className={`bg-white md:w-70 h-10 rounded-lg pl-10`}
            style={
              {
                color: COLORS.black,
                backgroundColor: `${width < MOBILE_SIZE ? COLORS.background : COLORS.white}`,
                "--autofill-color": COLORS.grey,
              } as CSSProperties
            }
            placeholder="Search..."
          />
        </div>
        <button
          className="bg-blue-500 hover:scale-105 ease-in-out transition-all text-white p-4  rounded-lg hidden  md:flex items-center justify-between px-6  "
          style={{ backgroundColor: COLORS.red }}
          onClick={toggleAddTransactionsForm}
        >
          <Plus color={COLORS.white} size={20} className="mr-4" />
          <span color={COLORS.white}>Add Transaction</span>
        </button>
        <img src={pict} alt="Avatar" className="w-13 h-13 rounded-full" />
      </div>
    </div>
  );
};

export default Header;
