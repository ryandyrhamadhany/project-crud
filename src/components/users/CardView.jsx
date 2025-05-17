import { FaEnvelope, FaBriefcase, FaUser, FaCalendar, FaCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

export const CardView = ({ users, handleEditUser, handleDeleteUser, formatDate, getStatusBadge, getStatusDot }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {users.length ? users.map(user => (
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
        No users found
      </div>
    )}
  </div>
);