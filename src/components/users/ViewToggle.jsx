import { TbTable, TbLayoutGrid } from "react-icons/tb";

export const ViewToggle = ({ viewMode, setViewMode }) => (
  <div className="flex gap-2">
    <button 
      onClick={() => setViewMode("table")} 
      className={`p-1.5 rounded ${viewMode === "table" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}
      aria-label="Table view"
    >
      <TbTable size={20} />
    </button>
    <button 
      onClick={() => setViewMode("card")} 
      className={`p-1.5 rounded ${viewMode === "card" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}
      aria-label="Card view"
    >
      <TbLayoutGrid size={20} />
    </button>
  </div>
);