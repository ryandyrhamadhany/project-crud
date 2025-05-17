import { FaSort, FaEdit, FaTrashAlt, FaEye, FaEllipsisV, FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";

export const TableView = ({ 
  users, 
  sortConfig, 
  requestSort, 
  getSortIndicator, 
  handleEditUser, 
  handleDeleteUser, 
  formatDate, 
  getStatusBadge 
}) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleActionMenu = (userId) => {
    setActionMenuOpen(actionMenuOpen === userId ? null : userId);
  };

  const closeAllMenus = () => {
    setActionMenuOpen(null);
  };

  // Mobile Card View Component for each user
  const MobileUserCard = ({ user }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 rounded-full p-2 text-blue-600">
            <FaUserCircle size={24} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{user.nama}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <span className="bg-gray-100 text-gray-700 py-1 px-2 rounded-md text-xs font-medium">
          #{user.id}
        </span>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 uppercase">Role</p>
            <div className="mt-1">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                {user.role}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Status</p>
            <div className="mt-1">
              <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${getStatusBadge(user.status)}`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 uppercase">Gender</p>
            <p className="text-sm text-gray-700 mt-1">{user.jenis_kelamin}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Birthdate</p>
            <p className="text-sm text-gray-700 mt-1">{formatDate(user.tanggal_lahir)}</p>
          </div>
        </div>
      </div>
      
      <div className="py-3 px-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
        <button 
          onClick={() => handleEditUser(user)} 
          className="px-3 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaEdit size={16} />
            <span className="text-sm font-medium">Edit</span>
          </div>
        </button>
        
        <button 
          onClick={() => handleDeleteUser(user.id)} 
          className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaTrashAlt size={16} />
            <span className="text-sm font-medium">Delete</span>
          </div>
        </button>
      </div>
    </div>
  );

  // If mobile, render cards instead of table
  if (isMobile) {
    return (
      <div className="p-1">
        {users.length ? (
          users.map(user => <MobileUserCard key={user.id} user={user} />)
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium text-gray-500">No users found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop table view
  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {/* Column Headers with Improved Styling */}
              <th 
                onClick={() => requestSort('id')} 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>ID</span>
                  <span className="text-gray-400">{getSortIndicator('id')}</span>
                  <FaSort className="text-gray-400" size={12} />
                </div>
              </th>
              
              <th 
                onClick={() => requestSort('nama')} 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  <span className="text-gray-400">{getSortIndicator('nama')}</span>
                  <FaSort className="text-gray-400" size={12} />
                </div>
              </th>
              
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Role
              </th>
              
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Gender
              </th>
              
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Birthdate
              </th>
              
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.length ? users.map(user => (
              <tr 
                key={user.id} 
                className="hover:bg-gray-50 transition-colors"
                onClick={closeAllMenus}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span className="bg-gray-100 text-gray-700 py-1 px-2 rounded-md">#{user.id}</span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.nama}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm font-medium">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                      {user.role}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                  {user.jenis_kelamin}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                  {formatDate(user.tanggal_lahir)}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <div className="flex justify-end items-center space-x-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditUser(user);
                        }} 
                        className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-full transition-colors"
                      >
                        <FaEdit size={16} />
                      </button>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }} 
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleActionMenu(user.id);
                        }}
                        className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FaEllipsisV size={16} />
                      </button>
                    </div>
                    
                    {actionMenuOpen === user.id && (
                      <div 
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              // View details action
                              toggleActionMenu(null);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FaEye size={14} />
                              <span>View Details</span>
                            </div>
                          </button>
                          
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              handleEditUser(user);
                              toggleActionMenu(null);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FaEdit size={14} />
                              <span>Edit User</span>
                            </div>
                          </button>
                          
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => {
                              handleDeleteUser(user.id);
                              toggleActionMenu(null);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FaTrashAlt size={14} />
                              <span>Delete User</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-500">No users found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};