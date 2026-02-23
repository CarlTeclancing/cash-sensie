import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";

type props = {
  isDarkMode: boolean;
  isBgTransparent: boolean;
  text: string;
  onClick?: () => void;
};

const LoginPageButton = ({
  isDarkMode,
  isBgTransparent,
  text,
  onClick,
}: props) => {
  return (
    <button
      className={`w-full h-10 flex items-center justify-center rounded-md hover:scale-104 text-md  duration-200 ease-in-out`}
      onClick={onClick}
      style={{
        backgroundColor: isBgTransparent
          ? "transparent"
          : isDarkMode
            ? DARK_MODE_COLORS.blue
            : COLORS.blue,
        border: isBgTransparent
          ? `2px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`
          : "none",
        color: isBgTransparent
          ? isDarkMode
            ? DARK_MODE_COLORS.blue
            : COLORS.blue
          : "#FFFFFF",
      }}
    >
      <p>{text}</p>
    </button>
  );
};

export default LoginPageButton;
