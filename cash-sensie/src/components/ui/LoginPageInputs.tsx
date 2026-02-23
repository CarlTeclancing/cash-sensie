import {
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type RefObject,
} from "react";
import { Eye, EyeClosed } from "lucide-react";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";

type props = {
  isDarkMode: boolean;
  type: string;
  placeholder: string;
  value?: string;
  name?: string;
  id?: string;
  errorMsg?: string;
  pattern?: string;
  max?: string | number;
  min?: string | number;
  ref?: RefObject<HTMLInputElement | null>;
  onChange: (el: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (el: FocusEvent<HTMLInputElement>) => void;
};

const LoginPageInputs = ({
  isDarkMode,
  type,
  placeholder,
  name,
  id,
  value,
  max,
  min,
  errorMsg,
  pattern,
  onChange,
  ref,
  onBlur,
}: props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="relative w-full">
      <input
        type={isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        pattern={pattern}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        ref={ref}
        className={`w-full h-10 rounded-md  text-md ${type !== "password" || "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"} p-3 ${type === "password" ? "pr-10" : ""} ${!isDarkMode ? "[&::-webkit-calendar-picker-indicator]:invert" : "[&::-webkit-calendar-picker-indicator]:brightness(0) brightness(0)"}`}
        style={
          {
            border: `1px solid ${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            color: `${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            backgroundColor: "transparent",
            transition: "background-color 50000s ease-in-out 0s",
            "--autofill-color": `${isDarkMode ? COLORS.grey : COLORS.dark_grey}`,
            colorScheme: !isDarkMode ? "dark" : "light",
          } as CSSProperties
        }
      />
      {type === "password" &&
        (isPasswordVisible ? (
          <Eye
            size={20}
            color={isDarkMode ? COLORS.grey : COLORS.dark_grey}
            className="absolute right-3 top-3"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        ) : (
          <EyeClosed
            size={20}
            color={isDarkMode ? COLORS.grey : COLORS.dark_grey}
            className="absolute right-3 top-3"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        ))}
    </div>
  );
};

export default LoginPageInputs;
