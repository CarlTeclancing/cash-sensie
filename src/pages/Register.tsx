import loginImage from "../assets/login-page-image.png";
import logo from "../assets/logo.svg";
import darkModeLogo from "../assets/dark-logo.png";
import { COLORS, DARK_MODE_COLORS } from "../constants/constants";
import RegisterPage1 from "../components/ui/RegisterPage1";
import ProgressComponent from "../components/ui/ProgressComponent";
import RegisterProgressBar from "../components/ui/RegisterProgressBar";
import RegisterPage2 from "../components/ui/RegisterPage2";
import RegisterPage3 from "../components/ui/RegisterPage3";
import RegisterFinalPage from "../components/ui/RegisterFinalPage";
import { useAppStore } from "../store/store";

type props = {
  isDarkMode: boolean;
};

const Register = ({ isDarkMode }: props) => {
  const { currentRegisterPage } = useAppStore();
  return (
    <div className="w-screen h-screen flex  overflow-hidden">
      <div
        className="md:w-1/2 w-screen h-screen  inline-flex justify-center items-center"
        style={{
          backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
        }}
      >
        <div
          className={`flex w-9/11 md:w-7/11 flex-col gap-6.5 justify-center items-center`}
        >
          <RegisterProgressBar progress={currentRegisterPage || 1} />
          <img src={isDarkMode ? darkModeLogo : logo} alt="logo" />

          {currentRegisterPage === 1 && (
            <RegisterPage1 isDarkMode={isDarkMode} />
          )}
          {currentRegisterPage === 2 && (
            <RegisterPage2 isDarkMode={isDarkMode} />
          )}
          {currentRegisterPage === 3 && (
            <RegisterPage3 isDarkMode={isDarkMode} />
          )}
          {currentRegisterPage === 4 && (
            <RegisterFinalPage isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
      <div className="w-1/2 h-screen md:inline-block hidden">
        <img
          src={loginImage}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
