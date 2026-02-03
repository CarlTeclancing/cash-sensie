import { useState } from "react";
import TableRow from "./TableRow";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";
import TransactionFormModal from "./TransactionFormModal";
import type { TransactionFormData } from "./TransactionFormModal";

const tableData: Array<{
  id: string;
  icon: string;
  title: string;
  date: string;
  type: "Debit" | "Saving";
  amount: string;
}> = [
  {
    id: "1",
    icon: "💳",
    title: "Grocery Shopping",
    date: "2024-01-15",
    type: "Debit",
    amount: "-$45.50",
  },
  {
    id: "2",
    icon: "💰",
    title: "Monthly Savings",
    date: "2024-01-10",
    type: "Saving",
    amount: "+$500.00",
  },
  {
    id: "3",
    icon: "🎬",
    title: "Movie Tickets",
    date: "2024-01-12",
    type: "Debit",
    amount: "-$30.00",
  },
];

const Table = () => {
  const { isDarkMode } = useAppStore();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= MOBILE_SIZE;
  const [rows, setRows] = useState(tableData);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TransactionFormData | null>(
    null,
  );

  const handleEdit = (id: string) => {
    const row = rows.find((item) => item.id === id);
    if (row) {
      setEditingRow({
        id: row.id,
        title: row.title,
        date: row.date,
        type: row.type,
        amount: row.amount,
      });
      setIsEditOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSave = (data: TransactionFormData) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === data.id
          ? {
              ...row,
              title: data.title,
              date: data.date,
              type: data.type,
              amount: data.amount,
            }
          : row,
      ),
    );
    setIsEditOpen(false);
    setEditingRow(null);
  };

  return (
    <div className="md:w-full w-11/12 flex items-center justify-center ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex">
          <div className="w-1/6 md:w-1/12 flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Icon
            </span>
          </div>
          <div className="w-3/6 md:w-3/12 flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Title
            </span>
          </div>
          <div className="w-0 md:w-1/6 hidden  md:flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Date
            </span>
          </div>
          <div className="w-1/3 md:w-1/6 flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Amount
            </span>
          </div>
          <div className="w-0 md:w-1/6 hidden  md:flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Type
            </span>
          </div>
          <div className="w-0 md:w-1/6 hidden  md:flex justify-center">
            <span
              className="text-md  font-bold "
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Action
            </span>
          </div>
        </div>
        <div
          className="flex flex-col gap-2 rounded-xl py-4"
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
          {rows.length === 0 ? (
            <div className="text-center py-6" style={{ color: COLORS.grey }}>
              No transactions
            </div>
          ) : (
            rows.map((row, index) => (
              <TableRow
                key={row.id}
                {...row}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLast={index === rows.length - 1}
              />
            ))
          )}
        </div>
      </div>
      <TransactionFormModal
        isOpen={isEditOpen}
        mode="edit"
        initialData={editingRow}
        onClose={() => {
          setIsEditOpen(false);
          setEditingRow(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
};

export default Table;
