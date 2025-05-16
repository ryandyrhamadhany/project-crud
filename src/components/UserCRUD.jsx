import React, { useState, useEffect } from "react";
import { users as initialData } from "../utils/dummyData";
import { 
  FaEdit, FaTrashAlt, FaPlus, FaSearch, 
  FaSort, FaFilter, FaChevronLeft, FaChevronRight 
} from "react-icons/fa";

const UserCRUD = () => {
  const [users, setUsers] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Filter the data based on search term
  const filteredData = users.filter(user =>
    [user.nama, user.email, user.role]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort the filtered data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
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

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-1">Manage your system users with ease</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/" className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
            <FaChevronLeft size={14} />
            Back to Dashboard
          </a>
          <button 
            onClick={() => {
              setSelectedUser(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-sm"
          >
            <FaPlus size={14} />
            Add New User
          </button>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-lg text-gray-700 font-medium">
          {filteredData.length} {filteredData.length === 1 ? 'user' : 'users'} found
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
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
          <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <FaFilter size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* User table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => requestSort('id')} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    ID{getSortIndicator('id')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('nama')} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Name{getSortIndicator('nama')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('email')} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Email{getSortIndicator('email')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('status')} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Status{getSortIndicator('status')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('role')} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Role{getSortIndicator('role')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length ? currentItems.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.nama}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                      >
                        <FaEdit size={16} />
                        <span className="hidden md:inline">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                      >
                        <FaTrashAlt size={16} />
                        <span className="hidden md:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No users found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      {sortedData.length > itemsPerPage && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastItem, sortedData.length)}</span> of{" "}
            <span className="font-medium">{sortedData.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaChevronLeft size={14} />
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to determine which page numbers to show
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === pageNum
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit User - When implemented fully */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form className="space-y-4">
              {/* Form fields would go here */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {selectedUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCRUD;