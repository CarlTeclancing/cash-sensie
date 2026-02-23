import { Link } from "react-router-dom";
import { useAppStore } from "../store/store";
import { COLORS, DARK_MODE_COLORS } from "../constants/constants";
import LoginPageButton from "../components/ui/LoginPageButton";

const NotFound = () => {
  const { isDarkMode } = useAppStore();

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center gap-8 px-4"
      style={{
        backgroundColor: isDarkMode
          ? DARK_MODE_COLORS.darkBlue
          : COLORS.background,
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <h1
          className="text-9xl font-bold"
          style={{
            color: isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue,
          }}
        >
          404
        </h1>
        <h2
          className="text-3xl font-semibold text-center"
          style={{
            color: isDarkMode ? COLORS.white : COLORS.dark_grey,
          }}
        >
          Page Not Found
        </h2>
        <p
          className="text-center text-lg max-w-md"
          style={{
            color: isDarkMode ? COLORS.grey : COLORS.headerGrey,
          }}
        >
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Link to="/dashboard">
          <button
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
              color: COLORS.white,
            }}
          >
            Go to Dashboard
          </button>
        </Link>
        <Link to="/login">
          <button
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              border: `2px solid ${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
              color: isDarkMode ? COLORS.white : COLORS.blue,
              backgroundColor: "transparent",
            }}
          >
            Back to Login
          </button>
        </Link>
      </div>

      <div className="mt-8">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke={isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}
            strokeWidth="4"
            strokeDasharray="10 5"
            opacity="0.3"
          />
          <path
            d="M70 80 Q100 50 130 80"
            stroke={isDarkMode ? COLORS.grey : COLORS.headerGrey}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx="75"
            cy="85"
            r="8"
            fill={isDarkMode ? COLORS.grey : COLORS.dark_grey}
          />
          <circle
            cx="125"
            cy="85"
            r="8"
            fill={isDarkMode ? COLORS.grey : COLORS.dark_grey}
          />
          <path
            d="M70 130 Q100 150 130 130"
            stroke={isDarkMode ? COLORS.grey : COLORS.headerGrey}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
