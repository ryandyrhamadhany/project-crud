export const ViewToggle = ({ viewMode, setViewMode }) => (
    <div className="flex gap-2">
      <button 
        onClick={() => setViewMode("table")} 
        className={`p-1.5 rounded ${viewMode === "table" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}
        aria-label="Table view"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      </button>
      <button 
        onClick={() => setViewMode("card")} 
        className={`p-1.5 rounded ${viewMode === "card" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}
        aria-label="Card view"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </button>
    </div>
  );