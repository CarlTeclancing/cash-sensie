import { useState, useEffect, useMemo } from "react";
import PageTitle from "../components/ui/PageTitle";
import { useWindowSize } from "../hooks/useWindowSize";
import { MOBILE_SIZE, COLORS, DARK_MODE_COLORS } from "../constants/constants";
import TaxTable from "../components/ui/TaxTable";
import TaxFormModal, { type TaxFormData } from "../components/ui/TaxFormModal";
import { useAppStore } from "../store/store";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

type TaxRow = {
  id: string;
  title: string;
  description: string;
  amount: string;
  recurring: boolean;
};

function getToken() {
  try {
    return localStorage.getItem("token") || "";
  } catch {
    return "";
  }
}

const Taxes = () => {
  const { width } = useWindowSize();
  const { isDarkMode } = useAppStore();
  const isMobile = width <= MOBILE_SIZE;
  const [taxes, setTaxes] = useState<TaxRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedTax, setSelectedTax] = useState<TaxFormData | null>(null);

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }),
    [],
  );

  const fetchTaxes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/taxes`, { headers });
      const json = await res.json();
      if (!json.success)
        throw new Error(json.message || "Failed to fetch taxes");
      const mapped: TaxRow[] = (json.taxes || []).map((t: any) => ({
        id: t._id,
        title: t.title,
        description: t.description,
        amount: `$${Number(t.amount || 0).toFixed(2)}`,
        recurring: t.recurring,
      }));
      setTaxes(mapped);
    } catch (e) {
      console.error(e);
      setTaxes([]);
    }
  };

  useEffect(() => {
    fetchTaxes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTax = () => {
    setModalMode("add");
    setSelectedTax(null);
    setIsModalOpen(true);
  };

  const handleEditTax = (id: string) => {
    const tax = taxes.find((item) => item.id === id);
    if (tax) {
      setSelectedTax(tax);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleDeleteTax = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/taxes/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");
      setTaxes((prev) => prev.filter((tax) => tax.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveTax = async (data: TaxFormData) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        amount: Number(String(data.amount).replace(/[^0-9.-]/g, "")),
        recurring: data.recurring,
      };

      const url =
        modalMode === "edit" && data.id
          ? `${API_BASE}/api/taxes/${data.id}`
          : `${API_BASE}/api/taxes`;
      const method = modalMode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Save failed");

      fetchTaxes();
    } catch (e) {
      console.error(e);
    }

    setIsModalOpen(false);
    setSelectedTax(null);
  };

  return (
    <div className="py-8 md:px-5 w-full flex flex-col gap-4 items-center justify-center">
      {isMobile ? (
        <div className="w-11/12 flex items-center justify-between">
          <span
            className="text-xl font-bold"
            style={{ color: isDarkMode ? COLORS.white : COLORS.black }}
          >
            Taxes
          </span>
          <button
            onClick={handleAddTax}
            className="px-4 py-2 rounded-md text-sm font-semibold"
            style={{
              backgroundColor: isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue,
              color: COLORS.white,
            }}
          >
            Add Tax
          </button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between">
          <div className="w-10/12">
            <PageTitle title="Taxes" />
          </div>
          <div className="w-1/12">
            <button
              onClick={handleAddTax}
              className="px-4 m py-2 rounded-md text-sm font-semibold"
              style={{
                backgroundColor: isDarkMode
                  ? DARK_MODE_COLORS.blue
                  : COLORS.blue,
                color: COLORS.white,
              }}
            >
              Add Tax
            </button>
          </div>
        </div>
      )}
      <TaxTable
        taxes={taxes}
        onEdit={handleEditTax}
        onDelete={handleDeleteTax}
      />
      <TaxFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedTax}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTax(null);
        }}
        onSave={handleSaveTax}
      />
    </div>
  );
};

export default Taxes;
