import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import FloatingIcon from "../ui/FloatingIcon";
import AddTransactionForm from "../ui/AddTransactionForm";

const Layout = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const location = useLocation();

  // Check if current path is settings
  const isSettingsPage = location.pathname === "/settings";
  const shouldHideHeader = hideHeader || isSettingsPage;

  return (
    <div className="w-full overflow-x-hidden">
      <Sidebar />
      {!shouldHideHeader && <Header />}
      <FloatingIcon />
      <AddTransactionForm />
      <div className={`w-full flex float-right md:w-4/5 ${!shouldHideHeader ? "mt-20" : "mt-10"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
