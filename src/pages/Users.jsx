import React, { useState, useEffect } from "react";
import { Header } from "../components/users/Header";
import { SearchBar } from "../components/users/SearchBar";
import { ViewToggle } from "../components/users/ViewToggle";
import { CardView } from "../components/users/CardView";
import { TableView } from "../components/users/TableView";
import { Pagination } from "../components/users/Pagination";
import { UserModal } from "../components/users/UserModal";
import { users as initialData } from "../utils/dummyData";
import { 
  FaFilter
} from "react-icons/fa";

export const Users = () => {
  const [users, setUsers] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setViewMode("card");
      else setViewMode("table");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredData = users.filter(user =>
    [user.nama, user.email, user.role, user.status]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
    setSortConfig({ key, direction });
  };

  const getSortIndicator = key => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  const getStatusBadge = status => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'inactive': return 'bg-red-100 text-red-800 border border-red-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      default: return 'bg-blue-100 text-blue-800 border border-blue-200';
    }
  };

  const getStatusDot = status => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-emerald-500';
      case 'inactive': return 'text-red-500';
      case 'pending': return 'text-amber-500';
      default: return 'text-blue-500';
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsAddModalOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <Header onAddUser={() => {
        setSelectedUser(null);
        setIsAddModalOpen(true);
      }} />
      {/* Search dan Filter */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-lg text-gray-700 font-medium">
            {filteredData.length} {filteredData.length === 1 ? 'user' : 'users'} found
          </div>
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <FaFilter size={14} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>
      {/* Tampilan Card atau Tabel */}
      {viewMode === "card" && (
        <CardView 
          users={currentItems} 
          handleEditUser={handleEditUser} 
          handleDeleteUser={handleDeleteUser} 
          formatDate={formatDate} 
          getStatusBadge={getStatusBadge} 
          getStatusDot={getStatusDot} 
        />
      )}
      {viewMode === "table" && (
        <TableView 
          users={currentItems} 
          sortConfig={sortConfig} 
          requestSort={requestSort} 
          getSortIndicator={getSortIndicator} 
          handleEditUser={handleEditUser} 
          handleDeleteUser={handleDeleteUser} 
          formatDate={formatDate} 
          getStatusBadge={getStatusBadge} 
        />
      )}
      {/* Pagination */}
      {sortedData.length > itemsPerPage && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          handlePageChange={handlePageChange} 
        />
      )}
      {/* Modal */}
      <UserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        selectedUser={selectedUser} 
        handleSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newUser = Object.fromEntries(formData);
          if (selectedUser) {
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...newUser } : u));
          } else {
            const newId = Math.max(...users.map(u => u.id)) + 1;
            setUsers([...users, { ...newUser, id: newId }]);
          }
          setIsAddModalOpen(false);
        }} 
      />
    </div>
  );
};

export default Users;