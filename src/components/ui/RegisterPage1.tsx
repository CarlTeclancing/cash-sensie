import { COLORS } from "../../constants/constants";
import LoginPageInputs from "./LoginPageInputs";
import { Link } from "react-router";
import LineWithText from "./LineWithText";
import LoginPageButton from "./LoginPageButton";
import { useAppStore } from "../../store/store";
import { useRef, useState, type FocusEvent } from "react";

type props = {
  isDarkMode: boolean;
};

type errors = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage1 = ({ isDarkMode }: props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {
    incrementRegisterPage,
    updateRegistrationData,
    registrationData,
    completedPagesRegister,
    updateCompletedPagesRegister,
  } = useAppStore();
  const [errors, setErrors] = useState<errors>({
    name: "",
    email: "",
    password: "",
  });

  const checkValidity = (
    e: FocusEvent<HTMLInputElement>,
    field: string,
  ): string => {
    const { validity } = e.target;

    if (!e.target.value) return "This field is obligatory.";
    if (validity.typeMismatch && field === "email") {
      return "Please enter a valid email address (e.g., student@school.com).";
    }

    if (field === "name" && e.target.value.length < 3) {
      return `${field} must be at least 3 characters.`;
    }

    if (validity.patternMismatch) {
      if (field === "password") {
        return "Use 8 or more characters with a mix of letters, numbers & symbols.";
      }
      if (field === "name") {
        return "name should not contain numbers or special characters.";
      }
      if (field === "phone") {
        return "Please enter a valid phone number.";
      }
      return "Invalid format.";
    }

    if (validity.rangeUnderflow) return "Date is too old!";
    return "";
  };

  const submitHandler = () => {
    if (!registrationData.name) {
      setErrors((prev) => ({
        ...prev,
        name: "This field is obligatory.",
      }));
    }

    if (!registrationData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "This field is obligatory.",
      }));
    }

    if (!registrationData.password) {
      setErrors((prev) => ({
        ...prev,
        password: "This field is obligatory.",
      }));
    }

    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      registrationData.name &&
      registrationData.email &&
      registrationData.password
    ) {
      updateCompletedPagesRegister &&
        updateCompletedPagesRegister(completedPagesRegister + 1 || 1);
      incrementRegisterPage && incrementRegisterPage();
    } else {
      if (errors.name || !registrationData.name) {
        nameRef.current?.focus();
      } else if (errors.email || !registrationData.email) {
        emailRef.current?.focus();
      } else {
        passwordRef.current?.focus();
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
          htmlFor="name"
        >
          Full Name:
        </label>
        <div>
          <LoginPageInputs
            isDarkMode={isDarkMode}
            type={"text"}
            placeholder={"Enter your full name"}
            id="name"
            value={registrationData.name}
            errorMsg={errors.name}
            onBlur={(e) => {
              setErrors((prev) => ({
                ...prev,
                name: checkValidity(e, "name"),
              }));
            }}
            pattern="^[A-Za-z\s]+$"
            onChange={(el) => {
              updateRegistrationData({
                ...registrationData,
                name: el.target.value,
              });
            }}
            ref={nameRef}
          />
          <label
            htmlFor={"name"}
            className="text-xs"
            style={{ color: COLORS.red }}
          >
            {errors.name}
          </label>
        </div>

        <label
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          htmlFor="email"
        >
          Email:
        </label>
        <div>
          <LoginPageInputs
            isDarkMode={isDarkMode}
            type={"email"}
            value={registrationData.email}
            placeholder={"Email"}
            id="email"
            errorMsg={errors.email}
            onBlur={(e) => {
              setErrors((prev) => ({
                ...prev,
                email: checkValidity(e, "email"),
              }));
            }}
            ref={emailRef}
            onChange={(el) => {
              updateRegistrationData({
                ...registrationData,
                email: el.target.value,
              });
            }}
          />
          <label
            htmlFor={"email"}
            className="text-xs"
            style={{ color: COLORS.red }}
          >
            {errors.email}
          </label>
        </div>
        <label
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          htmlFor="password"
        >
          Password:
        </label>
        <div>
          <LoginPageInputs
            isDarkMode={isDarkMode}
            type={"password"}
            value={registrationData.password}
            id="password"
            name="password"
            placeholder={"Password"}
            errorMsg={errors.password}
            onChange={(el) => {
              updateRegistrationData({
                ...registrationData,
                password: el.target.value,
              });
            }}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,}).*$"
            ref={passwordRef}
            onBlur={(e) => {
              setErrors((prev) => ({
                ...prev,
                password: checkValidity(e, "password"),
              }));
            }}
          />
          <label
            htmlFor={"password"}
            className="text-xs"
            style={{ color: COLORS.red }}
          >
            {errors.password}
          </label>
        </div>
      </div>
      <LoginPageButton
        isBgTransparent={false}
        text="Sign in"
        onClick={submitHandler}
        isDarkMode={isDarkMode}
      />
      <LineWithText text={"or"} />
      <LoginPageButton
        isBgTransparent={true}
        text="Continue with Google"
        isDarkMode={isDarkMode}
      />
      <div>
        <span
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.dark_grey}`,
          }}
          className="text-sm"
        >
          Already have an account?{" "}
        </span>
        <Link
          style={{
            color: `${isDarkMode ? COLORS.red : COLORS.grey}`,
          }}
          to="/login"
          className="text-sm underline"
        >
          Login here
        </Link>
      </div>
    </>
  );
};

export default RegisterPage1;
