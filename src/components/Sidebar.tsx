import logo from "../assets/logo.svg";
import MenuButton from "./MenuButton";
import dashbIconActive from "../assets/dashboard-icon-focus.svg";
import dashbIcon from "../assets/dashboard-icon.svg";
import debits from "../assets/debits.png";
import debitsFocus from "../assets/debits-focus.png";
import transactions from "../assets/transactions.png";
import transactionsFocus from "../assets/transactions-focus.png";
import savings from "../assets/savings.png";
import savingsFocus from "../assets/savings-focus.png";
import settings from "../assets/settings.png";
import settingsFocus from "../assets/settings-focus.png";
import taxes from "../assets/taxes.png";
import taxesFocus from "../assets/taxes-focus.png";
import activities from "../assets/activities.png";
import activitiesFocus from "../assets/activities-focus.png";
import logoutIcon from "../assets/logut-icon.png";
import { COLORS, DARK_MODE_COLORS } from "../constants/constants";
import darkLogo from "../assets/dark-logo.png";
import { useAppStore } from "../store/store";
import { useLocation } from "react-router";
import { useWindowSize } from "../hooks/useWindowSize";
import { MOBILE_SIZE } from "../constants/constants";
import MobileMenuButton from "./MobileMenuButton";
import dashboardIconRed from "../assets/dashboard-icon-red.png";
import savingsRedIcon from "../assets/savings-icon-red.png";
import debitsRedIcon from "../assets/debits-icon-red.png";
import transactionsRedIcon from "../assets/transactions-icon-red.png";
import plusIcon from "../assets/plus-icon.png";

const Sidebar = () => {
  const { width } = useWindowSize();
  const location = useLocation().pathname;
  const firstLocation = location.split(`/`).filter(Boolean)[0] || "dashboard";
  const { isDarkMode,toggleAddTransactionsForm } = useAppStore();
  const isActive = (location: string) =>
    location.toLowerCase() === firstLocation.toLowerCase();
  return (
    <div
      className="w-full py-4   fixed bottom-0 left-0 md:bottom-auto md:top-0  md:w-1/5 flex items-center justify-center md:justify-between h-1/9 md:h-screen flex-row md:flex-col rounded-t-3xl px-10 md:px-0 md:rounded-t-none"
      style={{
        backgroundColor: `${isDarkMode ? (width < MOBILE_SIZE ? DARK_MODE_COLORS.background : DARK_MODE_COLORS.darkBlue) : width < MOBILE_SIZE ? COLORS.background : COLORS.white}`,
        borderTop: `${width < MOBILE_SIZE ? `1px solid ${COLORS.green}` : ``} `,
      }}
    >
      {width < MOBILE_SIZE ? (
        <>
          <div
            className="absolute top-0 left-1/2 w-11 h-11 rounded-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10
             shadow-lg shadow-black/50" // "Normal" deep shadow
            style={{
              backgroundColor: isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue,
            }}
            onClick={toggleAddTransactionsForm}

          >
            <img src={plusIcon} alt="" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-7">
              <MobileMenuButton
                content="Home"
                isActive={isActive("dashboard")}
                icon={dashbIcon}
                iconActive={dashboardIconRed}
              />
              <MobileMenuButton
                content="Transactions"
                isActive={isActive("transactions")}
                icon={transactions}
                iconActive={transactionsRedIcon}
              />
            </div>
            <div className="flex gap-7">
              <MobileMenuButton
                content="Savings"
                isActive={isActive("savings")}
                icon={savings}
                iconActive={savingsRedIcon}
              />
              <MobileMenuButton
                content="Debits"
                isActive={isActive("debits")}
                icon={debits}
                iconActive={debitsRedIcon}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-10/11 flex flex-col justify-center items-center">
            <img
              src={isDarkMode ? darkLogo : logo}
              alt=""
              className="h-24 py-2"
            />
            <MenuButton
              content="Dashboard"
              isActive={isActive("dashboard")}
              icon={dashbIcon}
              iconActive={dashbIconActive}
            />
            <MenuButton
              content="Transactions"
              isActive={isActive("transactions")}
              icon={transactions}
              iconActive={transactionsFocus}
            />
            <MenuButton
              content="Savings"
              isActive={isActive("savings")}
              icon={savings}
              iconActive={savingsFocus}
            />
            <MenuButton
              content="Debits"
              isActive={isActive("debits")}
              icon={debits}
              iconActive={debitsFocus}
            />
            <MenuButton
              content="Activities"
              isActive={isActive("activities")}
              icon={activities}
              iconActive={activitiesFocus}
            />
            <MenuButton
              content="Taxes"
              isActive={isActive("taxes")}
              icon={taxes}
              iconActive={taxesFocus}
            />
            <MenuButton
              content="Settings"
              isActive={isActive("settings")}
              icon={settings}
              iconActive={settingsFocus}
            />
          </div>
          <div className="flex w-10/11 cursor-pointer">
            <img src={logoutIcon} alt="" className="mr-2" />
            <span style={{ color: COLORS.grey }}>Logout</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
