import { COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import LoginPageButton from "./LoginPageButton";
import ArrowUp from "../../assets/RegisterArrowUp.png";
import ArrowUpDark from "../../assets/RegisterArrowUpDark.png";
import axios from "axios"
type props = { isDarkMode: boolean };

const RegisterFinalPage = ({ isDarkMode }: props) => {
  const {registrationData,updateRegistrationData}=useAppStore()
const submitHandler=async()=>{
  try {
 const response = await axios.post("http://localhost:4000/api/user/register", {
      ...registrationData,
      });
      console.log(response.data);
      console.log("Registration successful");
      window.location.href="/login"
  } catch (error) {
    console.error("Registration failed:", error);
  }}
  return (
    <>
      <LoginPageButton
        isBgTransparent={false}
        text="Sensei Track"
        isDarkMode={isDarkMode}
        onClick={submitHandler}
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
