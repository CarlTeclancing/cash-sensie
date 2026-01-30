import { COLORS } from "../constants/constants";
import LoginPageButton from "./LoginPageButton";
import ArrowUp from "../assets/RegisterArrowUp.png";
import ArrowUpDark from "../assets/RegisterArrowUpDark.png"

type props = { isDarkMode: boolean };

const RegisterFinalPage = ({ isDarkMode }: props) => {
  return (
    <>
      <LoginPageButton
        isBgTransparent={false}
        text="Sensei Track"
        isDarkMode={isDarkMode}
      />
      <img
        src={isDarkMode ? ArrowUpDark : ArrowUp}
        alt="arrow-up"
        className="w-8 h-8"
      />
      <label
        style={{
          color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
        }}
      >
        Click above to start controlling your spending
      </label>
    </>
  );
};

export default RegisterFinalPage;
