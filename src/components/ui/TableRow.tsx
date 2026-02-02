import { COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import ArrowUpIcon from "../../assets/arrow-up.png";
import ArrowDownIcon from "../../assets/arrow-down.png";
import ActionIcon from "../../assets/action-icon.png";
import ActionIconDark from "../../assets/action-icon-darkmode.png";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";

type props = {
  id: string;
  icon: React.ReactNode;
  title: string;
  date: string;
  type: "Debit" | "Saving";
  amount: string;
};

const TableRow = (props: props) => {
  const { isDarkMode } = useAppStore();
  const isMobile = useWindowSize().width <= MOBILE_SIZE;
  return (
    <div className="w-full flex items-center  py-3 px-2 text-sm">
      <div className="w-1/6 md:w-1/12 flex justify-center">
        <div
          className="rounded-full p-1 items-center justify-center flex"
          style={{
            backgroundColor: isDarkMode ? COLORS.white : COLORS.background,
          }}
        >
          {props.icon}
        </div>
      </div>
      <div className="w-3/6 md:w-3/12 items-center flex justify-center">
        <span
          className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {props.title}
        </span>
      </div>

      <div className="w-0  md:w-1/6 items-center justify-center hidden md:flex">
        <span
          style={{
            color: COLORS.grey,
          }}
        >
          {props.date}
        </span>
      </div>

      <div className="w-1/3 md:w-1/6 items-center justify-center  gap-1 flex">
        <span
          className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
          style={{
            color: `${isMobile ? (props.type.toLocaleLowerCase() === "debit" ? COLORS.red : COLORS.green) : isDarkMode ? COLORS.white : COLORS.black}`,
          }}
        >
          {props.type.toLowerCase() === "debit"
            ? `${props.amount}`
            : `${props.amount}`}
        </span>
        {!isMobile &&
          (props.type.toLowerCase() === "debit" ? (
            <div className="flex items-center ">
              <img src={ArrowUpIcon} alt="arrow up" className="w-3 h-6 ml-3" />
            </div>
          ) : (
            <div className="flex items-center">
              <img src={ArrowDownIcon} alt="arrow down" className="w-6 h-6" />
            </div>
          ))}
      </div>
      <div className="w-0 md:w-1/6 items-center justify-center  hidden md:flex">
        <span
          className="font-semibold"
          style={{
            color:
              props.type.toLowerCase() === "debit" ? COLORS.red : COLORS.green,
          }}
        >
          {props.type}
        </span>
      </div>
      <div className="w-0 md:w-1/6 hidden  md:flex items-center justify-center">
        <button>
          <img
            src={isDarkMode ? ActionIconDark : ActionIcon}
            alt="action icon"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default TableRow;
