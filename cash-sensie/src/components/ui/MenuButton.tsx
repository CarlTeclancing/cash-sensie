import { useState } from "react";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import { Link } from "react-router";

type MenuButtonProps = {
  content: string;
  isActive: boolean;
  icon: string;
  iconActive: string;
};

const MenuButton = ({
  content,
  isActive,
  icon,
  iconActive,
}: MenuButtonProps) => {
  const { isDarkMode } = useAppStore();
  let [localeActive, setLocalAtive] = useState(false);
  return (
    <Link to={`/${content.toLowerCase()}`} className="w-full">
      <div
        onMouseEnter={() => {
          !isActive ? setLocalAtive(true) : "";
        }}
        onMouseLeave={() => {
          localeActive ? setLocalAtive(false) : "";
        }}
        className="cursor-pointer flex items-center rounded-md w-full h-11 pl-3 font-semibold text-md "
        style={{
          backgroundColor: `${isActive || localeActive ? (isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue) : isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
          color: `${isActive || localeActive ? COLORS.white : COLORS.grey}`,
        }}
      >
        <div className="mx-3 my-4 flex items-center">
          <img
            src={isActive || localeActive ? iconActive : icon}
            alt=""
            className="text-red-500"
          />
        </div>
        <p className="text-center">{content}</p>
      </div>
    </Link>
  );
};

export default MenuButton;
