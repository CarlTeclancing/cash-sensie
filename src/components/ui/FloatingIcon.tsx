import { motion } from "framer-motion";
import { useAppStore } from "../../store/store";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { Moon, Sun } from "lucide-react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";

const FloatingIcon = () => {
  const { width } = useWindowSize();
  const { isDarkMode, toggleDarkMode } = useAppStore();
  return (
    <motion.div
      drag
      dragConstraints={{
        top: width < MOBILE_SIZE ? -window.innerHeight + 70 : 0,
        left: width < MOBILE_SIZE ? -window.innerWidth + 70 : 0,
        right: width < MOBILE_SIZE ? 0 : window.innerWidth - 70,
        bottom: width < MOBILE_SIZE ? 0 : window.innerHeight - 70,
      }}
      dragElastic={0.1}
      dragMomentum={false}
      className=" bottom-30  z-50 right-2 md:top-2 md:left-2 md:bottom-auto md:right-auto p-2 rounded-full fixed"
      onClick={toggleDarkMode}
      style={{
        backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.grey}`,
      }}
    >
      {isDarkMode ? (
        <Sun size={20} style={{ color: COLORS.white }} />
      ) : (
        <Moon style={{ color: DARK_MODE_COLORS.darkBlue }} size={20} />
      )}
    </motion.div>
  );
};

export default FloatingIcon;
