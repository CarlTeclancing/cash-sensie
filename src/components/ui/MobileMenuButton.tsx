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

const MobileMenuButton = ({
  content,
  isActive,
  icon,
  iconActive,
}: MenuButtonProps) => {
  return (
    <Link
      to={content.toLowerCase() === "home" ? "/" : `/${content.toLowerCase()}`}
    >
      <div className="cursor-pointer flex flex-col items-center rounded-md gap-0.5  font-semibold text-md ">
        <div className=" flex items-center">
          <img src={isActive ? iconActive : icon} alt="" />
        </div>
        <span
          className="text-xs"
          style={{
            color: `${isActive ? COLORS.red : COLORS.grey}`,
          }}
        >
          {content}
        </span>
      </div>
    </Link>
  );
};

export default MobileMenuButton;
