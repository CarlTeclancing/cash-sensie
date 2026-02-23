import { COLORS } from "../../constants/constants";
import LoginPageInputs from "./LoginPageInputs";
import LoginPageButton from "./LoginPageButton";
import { useAppStore } from "../../store/store";
import { useRef, useState } from "react";

type props = {
  isDarkMode: boolean;
};

type errors = {
  address: string;
  occupation: string;
  date: string;
};

const RegisterPage2 = ({ isDarkMode }: props) => {
  const today = new Date();
  const addresRef = useRef<HTMLInputElement>(null);
  const occupationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const {
    incrementRegisterPage,
    updateRegistrationData,
    registrationData,
    completedPagesRegister,
    updateCompletedPagesRegister,
  } = useAppStore();
  const [errors, setErrors] = useState<errors>({
    address: "",
    occupation: "",
    date: "",
  });

  const checkValidity = (
    e: React.FocusEvent<HTMLInputElement>,
    field: string,
  ): string => {
    const { validity } = e.target;
    if (!e.target.value) return "This field is obligatory.";
    if (validity.rangeUnderflow) return "Date is too old!";
    if (field === "address" && e.target.value.length < 5) {
      return "Address must be at least 5 characters.";
    }
    if (validity.patternMismatch) {
      if (field === "occupation") {
        return "Occupation should not contain special characters.";
      }
      if (field === "date") {
        return "Please enter a valid date.";
      }
      if (field === "address") {
        return "Please enter a valid address.";
      }
    }
    return "";
  };

  const submitHandler = () => {
    if (!registrationData.address) {
      setErrors((prev) => ({
        ...prev,
        address: "This field is obligatory.",
      }));
    }
    if (!registrationData.occupation) {
      setErrors((prev) => ({
        ...prev,
        occupation: "This field is obligatory.",
      }));
    }
    if (!registrationData.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        date: "This field is obligatory.",
      }));
    }
    if (
      !errors.address &&
      !errors.occupation &&
      !errors.date &&
      registrationData.address &&
      registrationData.occupation &&
      registrationData.dateOfBirth
    ) {
      updateCompletedPagesRegister &&
        updateCompletedPagesRegister(completedPagesRegister + 1 || 1);
      incrementRegisterPage && incrementRegisterPage();
    } else {
      if (!registrationData.address || errors.address) {
        addresRef.current?.focus();
      } else if (errors.occupation || !registrationData.occupation) {
        occupationRef.current?.focus();
      } else {
        dateRef.current?.focus();
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <label
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          htmlFor="address"
        >
          Address:
        </label>
        <div>
          <LoginPageInputs
            isDarkMode={isDarkMode}
            type={"text"}
            placeholder={"Enter your Address"}
            id="address"
            ref={addresRef}
            errorMsg={errors.address}
            pattern="^[A-Za-z0-9'\.\-\s\,]*$"
            onBlur={(el) => {
              setErrors((prev) => ({
                ...prev,
                address: checkValidity(el, "address"),
              }));
            }}
            value={registrationData.address}
            onChange={(el) => {
              updateRegistrationData({
                ...registrationData,
                address: el.target.value,
              });
            }}
          />
        </div>
        <label htmlFor="name" className="text-xs" style={{ color: COLORS.red }}>
          {errors.address}
        </label>

        <label
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          htmlFor="occupation"
        >
          Occupation:
        </label>
        <div>
          <LoginPageInputs
            isDarkMode={isDarkMode}
            type={"text"}
            placeholder={"Enter your Occupation"}
            id="occupation"
            ref={occupationRef}
            errorMsg={errors.occupation}
            pattern="^[A-Za-z\s]+$"
            onBlur={(el) => {
              setErrors((prev) => ({
                ...prev,
                occupation: checkValidity(el, "occupation"),
              }));
            }}
            value={registrationData.occupation}
            onChange={(el) => {
              updateRegistrationData({
                ...registrationData,
                occupation: el.target.value,
              });
            }}
          />
          <label
            htmlFor="occupation"
            className="text-xs"
            style={{ color: COLORS.red }}
          >
            {errors.occupation}
          </label>
        </div>
        <label
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          htmlFor="date"
        >
          Date Of Birth:
        </label>
        <div>
          <LoginPageInputs
            isDarkMode={isDarkMode}
            type={"date"}
            ref={dateRef}
            errorMsg={errors.date}
            max={
              new Date(
                today.getFullYear() - 13,
                today.getMonth(),
                today.getDate(),
              )
                .toISOString()
                .split("T")[0]
            }
            min={"1900-01-01"}
            value={registrationData.dateOfBirth}
            onBlur={(el) => {
              setErrors((prev) => ({
                ...prev,
                date: checkValidity(el, "date"),
              }));
            }}
            name="date"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            onChange={(el) => {
              updateRegistrationData({
                ...registrationData,
                dateOfBirth: el.target.value,
              });
            }}
            placeholder={"Enter your Date of Birth"}
            id="date"
          />
          <label
            htmlFor="date"
            className="text-xs"
            style={{ color: COLORS.red }}
          >
            {errors.date}
          </label>
        </div>
      </div>
      <LoginPageButton
        isBgTransparent={false}
        onClick={submitHandler}
        text="Continue"
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default RegisterPage2;
