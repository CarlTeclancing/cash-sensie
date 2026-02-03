import { useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import { useWindowSize } from "../hooks/useWindowSize";
import { MOBILE_SIZE, COLORS, DARK_MODE_COLORS } from "../constants/constants";
import TaxTable from "../components/ui/TaxTable";
import TaxFormModal, {type TaxFormData } from "../components/ui/TaxFormModal";
import { useAppStore } from "../store/store";

type TaxRow = {
  id: string;
  title: string;
  description: string;
  amount: string;
  recurring: boolean;
};

const Taxes = () => {
  const { width } = useWindowSize();
  const { isDarkMode } = useAppStore();
  const isMobile = width <= MOBILE_SIZE;
  const [taxes, setTaxes] = useState<TaxRow[]>([
    {
      id: "1",
      title: "Income Tax",
      description: "Monthly income tax deduction",
      amount: "$120.00",
      recurring: true,
    },
    {
      id: "2",
      title: "Property Tax",
      description: "Annual property tax",
      amount: "$450.00",
      recurring: false,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedTax, setSelectedTax] = useState<TaxFormData | null>(null);

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

  const handleDeleteTax = (id: string) => {
    setTaxes((prev) => prev.filter((tax) => tax.id !== id));
  };

  const handleSaveTax = (data: TaxFormData) => {
    if (modalMode === "add") {
      const newTax: TaxRow = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        amount: data.amount,
        recurring: data.recurring,
      };
      setTaxes((prev) => [newTax, ...prev]);
    } else if (data.id) {
      setTaxes((prev) =>
        prev.map((tax) =>
          tax.id === data.id
            ? {
                ...tax,
                title: data.title,
                description: data.description,
                amount: data.amount,
                recurring: data.recurring,
              }
            : tax,
        ),
      );
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
