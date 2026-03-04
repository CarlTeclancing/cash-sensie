import { useEffect, useMemo, useState } from "react";
import TableRow from "./TableRow";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import { useAppStore } from "../../store/store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE_SIZE } from "../../constants/constants";
import TransactionFormModal from "./TransactionFormModal";
import type { TransactionFormData } from "./TransactionFormModal";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

type Row = {
  id: string;
  icon: string;
  title: string;
  date: string;
  type: "Debit" | "Saving";
  amount: string;
};

function getToken() {
  try {
    return localStorage.getItem("token") || "";
  } catch {
    return "";
  }
}

function formatDate(d?: string | Date) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 10);
}

function formatAmount(n: number, type: "Debit" | "Saving") {
  const sign = type === "Debit" ? "-" : "+";
  return `${sign}${n.toFixed(2)}`;
}

const Table = () => {
  const { isDarkMode, transactionFilterType } = useAppStore();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= MOBILE_SIZE;
  const [rows, setRows] = useState<Row[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TransactionFormData | null>(
    null,
  );

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }),
    [],
  );

  const fetchTransactions = async () => {
    try {
      const q =
        transactionFilterType && transactionFilterType !== "All"
          ? `?type=${encodeURIComponent(transactionFilterType)}`
          : "";
      const res = await fetch(`${API_BASE}/api/transaction${q}`, { headers });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to fetch");
      const mapped: Row[] = (data.transactions || []).map((t: any) => ({
        id: t._id,
        icon: t.emoji || "💳",
        title: t.title,
        date: formatDate(t.date),
        type: (t.type as "Debit" | "Saving") || "Debit",
        amount: formatAmount(Number(t.amount || 0), (t.type as any) || "Debit"),
      }));
      if (transactionFilterType && transactionFilterType !== "All") {
        setRows(mapped.filter((item) => item.type === transactionFilterType));
      } else {
        setRows(mapped);
      }
    } catch (e) {
      console.error(e);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionFilterType]);

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

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/transaction/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (data: TransactionFormData) => {
    try {
      const payload: any = {
        title: data.title,
        amount: Number(String(data.amount).replace(/[^0-9.-]/g, "")),
        type: data.type,
        category: data.type, // temporary mapping; adjust when category UI exists
        date: data.date ? new Date(data.date) : undefined,
      };

      if (data.id) {
        const res = await fetch(`${API_BASE}/api/transaction/${data.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Update failed");
        setIsEditOpen(false);
        setEditingRow(null);
        // Refresh list to reflect backend truth
        fetchTransactions();
      } else {
        const res = await fetch(`${API_BASE}/api/transaction`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Create failed");
        setIsEditOpen(false);
        setEditingRow(null);
        fetchTransactions();
      }
    } catch (e) {
      console.error(e);
    }
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
        mode={editingRow?.id ? "edit" : "add"}
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
