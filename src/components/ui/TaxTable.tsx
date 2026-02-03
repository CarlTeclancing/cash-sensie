import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";
import TaxRow from "./TaxRow";
import type { TaxRowData } from "./TaxRow";

type TaxTableProps = {
  taxes: TaxRowData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaxTable = ({ taxes, onEdit, onDelete }: TaxTableProps) => {
  const { isDarkMode } = useAppStore();
  const isMobile = useWindowSize().width <= MOBILE_SIZE;

  return (
    <div className="md:w-full w-11/12 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex pl-5">
          <div className="w-4/12 md:w-3/12 flex justify-start">
            <span
              className="text-md font-bold"
              style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
            >
              Title
            </span>
          </div>
          <div className="w-0 md:w-4/12 hidden md:flex justify-start">
            <span
              className="text-md font-bold"
              style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
            >
              Description
            </span>
          </div>
          <div className="w-4/12 md:w-2/12 flex justify-center">
            <span
              className="text-md font-bold"
              style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
            >
              Amount
            </span>
          </div>
          <div className="w-4/12 md:w-2/12 flex justify-center">
            <span
              className="text-md font-bold"
              style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
            >
              Recurring
            </span>
          </div>
          <div className="w-0 md:w-1/12 hidden md:flex justify-center">
            <span
              className="text-md font-bold"
              style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
            >
              Action
            </span>
          </div>
        </div>

        <div
          className="flex flex-col pl-5 gap-2 rounded-xl py-4"
          style={{
            backgroundColor: isDarkMode
              ? isMobile
                ? DARK_MODE_COLORS.background
                : DARK_MODE_COLORS.darkBlue
              : isMobile
                ? COLORS.background
                : COLORS.white,
          }}
        >
          {taxes.length === 0 ? (
            <div className="text-center py-6" style={{ color: COLORS.grey }}>
              No taxes added yet.
            </div>
          ) : (
            taxes.map((tax, index) => (
              <TaxRow
                key={tax.id}
                {...tax}
                onEdit={onEdit}
                onDelete={onDelete}
                isLast={index === taxes.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxTable;
