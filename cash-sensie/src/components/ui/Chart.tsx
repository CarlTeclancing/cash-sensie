import { useEffect, useMemo, useState } from "react";
import Bar from "./Bar";
import { useAppStore } from "../../store/store";
import { COLORS, DARK_MODE_COLORS } from "../../constants/constants";
import bars from "../../assets/blue-bars-icon.png";
import barsDark from "../../assets/blue-bars-icon-dark.png";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

type SeriesPoint = {
  label: string;
  value: number;
};

function getToken() {
  try {
    return localStorage.getItem("token") || "";
  } catch {
    return "";
  }
}

function monthLabel(y: number, m: number) {
  const date = new Date(y, m - 1, 1);
  return date.toLocaleString("default", { month: "short" });
}

const Chart = () => {
  const { isDarkMode, transactionFilterType } = useAppStore();
  const [series, setSeries] = useState<SeriesPoint[]>([]);
  const [total, setTotal] = useState(0);

  const title = useMemo(() => {
    if (transactionFilterType === "Saving") return "Total Savings";
    if (transactionFilterType === "Debit") return "Total Debits";
    return "Total Expenses";
  }, [transactionFilterType]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${getToken()}`,
        };
        const q =
          transactionFilterType && transactionFilterType !== "All"
            ? `?type=${encodeURIComponent(transactionFilterType)}`
            : "";
        const res = await fetch(
          `${API_BASE}/api/transaction/summary/data${q}`,
          {
            headers,
          },
        );
        const json = await res.json();
        if (!json.success)
          throw new Error(json.message || "Failed to load summary");

        const sorted = (json.monthly || []).sort((a: any, b: any) => {
          return a.year === b.year ? a.month - b.month : a.year - b.year;
        });
        const pts: SeriesPoint[] = sorted.map((m: any) => ({
          label: monthLabel(m.year, m.month),
          value: Number(m.total || 0),
        }));

        setSeries(pts);
        setTotal(json.total || 0);
      } catch (e) {
        console.error(e);
        setSeries([]);
        setTotal(0);
      }
    };

    fetchSummary();
  }, [transactionFilterType]);

  const maxVal = Math.max(...series.map((s) => s.value), 100);

  return (
    <div
      className="p-10 rounded-xl hidden w-full md:flex flex-col gap-4"
      style={{
        backgroundColor: `${isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white}`,
      }}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <span
            className="text-xs"
            style={{
              color: COLORS.grey,
            }}
          >
            {title}
          </span>
          <span
            className="text-2xl font-bold"
            style={{
              color: `${isDarkMode ? COLORS.white : COLORS.black}`,
            }}
          >
            ${total.toFixed(2)}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded"
          style={{
            backgroundColor: `${COLORS.background}`,
          }}
        >
          <img src={isDarkMode ? barsDark : bars} className="w-full h-full" />
        </div>
      </div>
      <div className="flex items-center w-full gap-3">
        <svg width="100%" height="2" className="flex-1">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke={isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}
            strokeWidth="1"
            strokeDasharray="10 5"
          />
        </svg>

        <span
          className=" text-xs font-bold whitespace-nowrap"
          style={{
            color: `${isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue}`,
          }}
        >
          ${(maxVal / 2).toFixed(0)}
        </span>
      </div>
      <div className="flex items-center justify-between w-full h-40 items-end gap-2">
        {series.length === 0 ? (
          <div className="w-full text-center text-gray-500">No data</div>
        ) : (
          series.map((s, i) => (
            <Bar key={i} content={s.label} value={s.value} max={maxVal} />
          ))
        )}
      </div>
    </div>
  );
};

export default Chart;
