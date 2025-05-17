import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative flex-grow sm:flex-grow-0">
    <input
      type="text"
      placeholder="Search users..."
      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    <div className="absolute right-3 top-2.5 text-gray-400">
      <FaSearch size={16} />
    </div>
  </div>
);