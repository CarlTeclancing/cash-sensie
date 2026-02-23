import { COLORS } from "../../constants/constants";
import LoginPageButton from "./LoginPageButton";
import { useAppStore } from "../../store/store";
import { useRef, useState } from "react";

type props = { isDarkMode: boolean };
const RegisterPage3 = ({ isDarkMode }: props) => {
  const {
    incrementRegisterPage,
    updateRegistrationData,
    registrationData,
    updateCompletedPagesRegister,
    completedPagesRegister,
  } = useAppStore();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  const [error, setError] = useState("");
  const submitHandler = () => {
    if (!isChecked) {
      checkboxRef.current?.focus();
      setError("Please accept the terms and conditions");
      return;
    }
    updateCompletedPagesRegister &&
      updateCompletedPagesRegister(completedPagesRegister + 1 || 1);
    incrementRegisterPage && incrementRegisterPage();
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <label
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          htmlFor="currency"
        >
          Select Currency:
        </label>
        <select
          id="currency"
          className="w-full h-10 rounded-md text-md pl-3"
          style={{
            border: `1px solid ${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            color: `${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            backgroundColor: "transparent",
          }}
          onChange={(e) =>
            updateRegistrationData({
              ...registrationData,
              currency: e.target.value,
            })
          }
          value={registrationData.currency}
        >
          <option value="XAF"> XAF </option>
          <option value={"USD"}> USD </option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
        </select>
        <label
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          htmlFor="text-area"
        >
          How did you find about us:
        </label>
        <textarea
          className="w-full h-30 resize-none rounded-md text-md p-3"
          style={{
            border: `1px solid ${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            color: `${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            backgroundColor: "transparent",
          }}
          name="text-area"
          id="text-area"
          onChange={(e) =>
            updateRegistrationData({
              ...registrationData,
              aboutUs: e.target.value,
            })
          }
          value={registrationData.aboutUs}
        ></textarea>
        <div className="flex mt-2 md:mt-0  items-center">
          <input
            type="checkbox"
            name="check"
            id="check"
            className=" h-4 w-4 rounded-sm mr-2 md:m-2 bg-transparent appearance-none checked:bg-gray-600"
            style={{
              float: "left",
              border: `1px solid${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            }}
            ref={checkboxRef}
            onChange={handleCheckboxChange}
          />
          <label
            style={{
              color: `${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            }}
            htmlFor="check"
          >
            Accept Terms & Conditions
          </label>
        </div>
        <label
          htmlFor="check"
          className="text-xs"
          style={{ color: COLORS.red }}
        >
          {error}
        </label>
      </div>
      <LoginPageButton
        isBgTransparent={false}
        text="Continue"
        isDarkMode={isDarkMode}
        onClick={submitHandler}
      />
    </>
  );
};

export default RegisterPage3;
