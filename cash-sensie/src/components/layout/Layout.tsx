import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import FloatingIcon from "../ui/FloatingIcon";
import AddTransactionForm from "../ui/AddTransactionForm";

const Layout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Sidebar />
      <Header />
      <FloatingIcon />
      <AddTransactionForm />
      <div className="w-full flex float-right  md:w-4/5 mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
