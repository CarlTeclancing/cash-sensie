import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Tests from "./pages/Tests";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppStore } from "./store/store";
import { Moon, Sun } from "lucide-react";
import { COLORS, DARK_MODE_COLORS } from "./constants/constants";
import { useWindowSize } from "./hooks/useWindowSize";
import Layout from "./components/Layout";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { width } = useWindowSize();
  const { isDarkMode, toggleDarkMode } = useAppStore();
  useEffect(() => {
    document.querySelector("body")!.style.backgroundColor =
      `${isDarkMode ? (width < 768 ? DARK_MODE_COLORS.darkBlue : DARK_MODE_COLORS.background) : width < 768 ? COLORS.white : COLORS.background}`;
  });
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<Register isDarkMode={isDarkMode} />}
          />
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/savings" element={<h1>Savings</h1>} />
            <Route path="/debits" element={<h1>Debits</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
          </Route>
          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
