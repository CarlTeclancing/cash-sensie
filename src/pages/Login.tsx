import loginImage from "../assets/login-page-image.png";
import logo from "../assets/logo.svg";
import darkModeLogo from "../assets/dark-logo.png";
import { COLORS, DARK_MODE_COLORS } from "../constants/constants";
import LoginPageInputs from "../components/LoginPageInputs";
import { Link } from "react-router";
import LineWithText from "../components/LineWithText";
import LoginPageButton from "../components/LoginPageButton";
import { useRef, useState } from "react";

type props = {
  isDarkMode: boolean;
};

type errors = {
  email: string;
  password: string;
};

const Login = ({ isDarkMode }: props) => {
  const [errors, setErrors] = useState<errors>({
    email: "",
    password: "",
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkValidity = (
    e: React.FocusEvent<HTMLInputElement>,
    field: string,
  ): string => {
    const { validity } = e.target;
    if (!e.target.value) return "This field is obligatory.";
    if (validity.typeMismatch && field === "email") {
      return "Please enter a valid email address (e.g., student@school.com).";
    }
    if (validity.patternMismatch) {
      if (field === "password") {
        return "Use 8 or more characters with a mix of letters, numbers & symbols.";
      }
      if (field === "email") {
        return "Please enter a valid email address (e.g., student@school.com).";
      }
    }
    return "";
  };

  const submitHandler = () => {
    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: "This field is obligatory.",
      }));
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: "This field is obligatory.",
      }));
      passwordRef.current?.focus();
      return;
    }
    if (errors.email || errors.password) {
      errors.email && emailRef.current?.focus();
      errors.password && passwordRef.current?.focus();
      return;
    }
    //FORM SUBMISSION LOGIC HERE
  };

  return (
    <div className="w-screen h-screen flex  overflow-hidden">
      <div
        className="md:w-1/2 w-screen h-screen  inline-flex justify-center items-center"
        style={{
          backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
        }}
      >
        <div
          className={`flex w-8/11 md:w-7/11 flex-col gap-5 justify-center items-center`}
        >
          <img src={isDarkMode ? darkModeLogo : logo} alt="logo" />
          <div className="w-full flex flex-col gap-2.5">
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
                value={email}
                ref={emailRef}
                errorMsg={errors.email}
                pattern={
                  "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
                }
                name="email"
                onBlur={(e) => {
                  setErrors((prev) => ({
                    ...prev,
                    name: checkValidity(e, "name"),
                  }));
                }}
                onChange={(el) => {
                  setEmail(el.target.value);
                }}
                placeholder={"Email"}
                id="email"
              />
              {errors.email && (
                <p className="text-xs" style={{ color: COLORS.red }}>
                  {errors.email}
                </p>
              )}
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
                id="password"
                placeholder={"Password"}
                onChange={(el) => {
                  setPassword(el.target.value);
                }}
                value={password}
                ref={passwordRef}
                errorMsg={errors.password}
                pattern={
                  "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
                }
                onBlur={(e) => {
                  setErrors((prev) => ({
                    ...prev,
                    password: checkValidity(e, "password"),
                  }));
                }}
                name="password"
              />
              {errors.password && (
                <p className="text-xs" style={{ color: COLORS.red }}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col-reverse md:flex-row justify-between md:items-center">
              <div className="flex mt-2 md:mt-0 md:justify-between items-center">
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  className=" h-4 w-4 rounded-sm mr-2 md:m-2 bg-transparent appearance-none checked:bg-gray-600"
                  style={{
                    float: "left",
                    border: `1px solid${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
                  }}
                />
                <label
                  style={{
                    color: `${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
                  }}
                  htmlFor="check"
                >
                  Remeber Me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm"
                style={{
                  color: `${isDarkMode ? COLORS.red : COLORS.grey}`,
                }}
              >
                Forgot Password
              </Link>
            </div>
            <LoginPageButton
              isBgTransparent={false}
              text="Sign in"
              onClick={submitHandler}
              isDarkMode={isDarkMode}
            />
          </div>
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
              Do not have an account?{" "}
            </span>
            <Link
              style={{
                color: `${isDarkMode ? COLORS.red : COLORS.grey}`,
              }}
              to="/signup"
              className="text-sm underline"
            >
              Register Now
            </Link>
          </div>
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

export default Login;
