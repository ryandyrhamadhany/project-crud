import { FaChevronLeft, FaPlus } from "react-icons/fa";

export const Header = ({ onAddUser }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">User Management</h2>
      <p className="text-gray-600 mt-1">Manage your system users with ease</p>
    </div>
    <div className="flex flex-wrap gap-3">
      <a href="/" className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
        <FaChevronLeft size={14} />
        <span className="hidden sm:inline">Back to Dashboard</span>
        <span className="sm:hidden">Back</span>
      </a>
      <button 
        onClick={onAddUser}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-sm"
      >
        <FaPlus size={14} />
        <span className="hidden sm:inline">Add New User</span>
        <span className="sm:hidden">Add User</span>
      </button>
    </div>
  </div>
);