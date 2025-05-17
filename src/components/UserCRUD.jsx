import React, { useState, useEffect } from "react";
import { users as initialData } from "../utils/dummyData";
import { 
  FaEdit, FaTrashAlt, FaPlus, FaSearch, 
  FaSort, FaFilter, FaChevronLeft, FaChevronRight,
  FaUser, FaEnvelope, FaCalendar, FaBriefcase,
  FaCircle
} from "react-icons/fa";

const UserCRUD = () => {
  const [users, setUsers] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  
  // Switch to card view on small screens automatically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("card");
      } else {
        setViewMode("table");
      }
    };
    
    // Set initial view mode
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter the data based on search term
  const filteredData = users.filter(user =>
    [user.nama, user.email, user.role, user.status]
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
      {/* Header with actions */}
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
            onClick={() => {
              setSelectedUser(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-sm"
          >
            <FaPlus size={14} />
            <span className="hidden sm:inline">Add New User</span>
            <span className="sm:hidden">Add User</span>
          </button>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-lg text-gray-700 font-medium">
            {filteredData.length} {filteredData.length === 1 ? 'user' : 'users'} found
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode("table")} 
              className={`p-1.5 rounded ${viewMode === "table" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}
              aria-label="Table view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
              </svg>
            </button>
            <button 
              onClick={() => setViewMode("card")} 
              className={`p-1.5 rounded ${viewMode === "card" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}
              aria-label="Card view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
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
          <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <FaFilter size={14} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Card View (Mobile-friendly) */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.length ? currentItems.map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.nama}</h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <FaEnvelope size={14} className="text-gray-400" />
                      {user.email}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1.5 ${getStatusBadge(user.status)}`}>
                    <FaCircle size={8} className={getStatusDot(user.status)} />
                    {user.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <FaBriefcase size={14} className="text-gray-400" />
                    <span className="font-medium">Role:</span>
                  </div>
                  <div>{user.role}</div>
                  
                  <div className="flex items-center gap-2">
                    <FaUser size={14} className="text-gray-400" />
                    <span className="font-medium">Gender:</span>
                  </div>
                  <div>{user.jenis_kelamin}</div>
                  
                  <div className="flex items-center gap-2">
                    <FaCalendar size={14} className="text-gray-400" />
                    <span className="font-medium">Birthdate:</span>
                  </div>
                  <div>{formatDate(user.tanggal_lahir)}</div>
                </div>
                
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => handleEditUser(user)}
                    className="px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded flex items-center gap-1.5 transition-colors"
                  >
                    <FaEdit size={14} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded flex items-center gap-1.5 transition-colors"
                  >
                    <FaTrashAlt size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full p-4 text-center text-gray-500 bg-white rounded-lg">
              No users found matching your search criteria
            </div>
          )}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => requestSort('id')} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    ID{getSortIndicator('id')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('nama')} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Name{getSortIndicator('nama')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('email')} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden sm:table-cell"
                >
                  <div className="flex items-center gap-2">
                    Email{getSortIndicator('email')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('role')} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                >
                  <div className="flex items-center gap-2">
                    Role{getSortIndicator('role')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('status')} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Status{getSortIndicator('status')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('jenis_kelamin')} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                >
                  <div className="flex items-center gap-2">
                    Gender{getSortIndicator('jenis_kelamin')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('tanggal_lahir')} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                >
                  <div className="flex items-center gap-2">
                    Birthdate{getSortIndicator('tanggal_lahir')}
                    <FaSort size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length ? currentItems.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{user.id}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.nama}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1.5 ${getStatusBadge(user.status)}`}>
                      <FaCircle size={8} className={getStatusDot(user.status)} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-500">{user.jenis_kelamin}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-500">{formatDate(user.tanggal_lahir)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                        title="Edit user"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        title="Delete user"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                    No users found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
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

      {/* Modal for Add/Edit User */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form className="space-y-4">
              {/* Nama */}
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  defaultValue={selectedUser?.nama || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter full name"
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={selectedUser?.email || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email address"
                />
              </div>
              
              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  defaultValue={selectedUser?.role || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Operator">Operator</option>
                </select>
              </div>
              
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={selectedUser?.status || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              
              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Laki-laki"
                      defaultChecked={selectedUser?.jenis_kelamin === 'Laki-laki'}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Laki-laki</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Perempuan"
                      defaultChecked={selectedUser?.jenis_kelamin === 'Perempuan'}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Perempuan</span>
                  </label>
                </div>
              </div>
              
              {/* Tanggal Lahir */}
              <div>
                <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700 mb-1">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  defaultValue={selectedUser?.tanggal_lahir || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
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