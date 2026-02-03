import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tests from "./pages/Tests";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useAppStore } from "./store/store";
import { COLORS, DARK_MODE_COLORS } from "./constants/constants";
import { useWindowSize } from "./hooks/useWindowSize";
import Layout from "./components/layout/Layout";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Taxes from "./pages/Taxes";
import Notes from "./pages/Notes";
import Savings from "./pages/Savings";
import Debits from "./pages/Debits";

const App = () => {
  const { width } = useWindowSize();
  const { isDarkMode } = useAppStore();
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/savings" element={<Savings/>} />
            <Route path="/debits" element={<Debits/>} />
            <Route path="/taxes" element={<Taxes />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
