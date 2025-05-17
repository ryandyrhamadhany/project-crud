import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  FaHome, 
  FaUser, 
  FaUsers, 
  FaUserPlus, 
  FaChevronDown, 
  FaChevronRight,
  FaSignOutAlt,
  FaList
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    dataUsers: false
  });
  
  // Toggle submenu expand/collapse
  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };
  
  // Main menu items configuration
  const menuItems = [
    { 
      id: "dashboard", 
      path: "/", 
      label: "Dashboard", 
      icon: <FaHome className="w-5 h-5" />
    },
    { 
      id: "dataUsers", 
      key: "dataUsers",
      label: "Data Users", 
      icon: <FaUsers className="w-5 h-5" />,
      hasSubmenu: true,
      submenu: [
        { 
          id: "usersList", 
          path: "/users", 
          label: "Lihat Data Users", 
          icon: <FaList className="w-4 h-4" />
        },
        { 
          id: "addUser", 
          path: "/tambah", 
          label: "Tambah Data User", 
          icon: <FaUserPlus className="w-4 h-4" />
        },
      ],
    },
    { 
      id: "profile", 
      path: "/profile_admin", 
      label: "Profile Admin", 
      icon: <FaUser className="w-5 h-5" />
    },
  ];

  // Check if a menu item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check if any submenu item is active
  const isSubmenuActive = (submenuItems) => {
    return submenuItems?.some(item => isActive(item.path));
  };

  return (
    <div 
      className={`${
        isOpen ? "w-64" : "w-20"
      } fixed h-full bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg transition-all duration-300 ease-in-out z-10`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
        {isOpen ? (
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        ) : (
          <h1 className="text-xl font-bold text-white mx-auto">AP</h1>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg text-white hover:bg-blue-600 focus:outline-none"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <div className="px-3 py-4">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className={`flex items-center w-full ${
                        isOpen ? "px-4 justify-between" : "justify-center px-2"
                      } py-3 rounded-lg transition-colors duration-200 ${
                        isSubmenuActive(item.submenu)
                          ? "bg-blue-800 text-white font-medium"
                          : "text-blue-100 hover:bg-blue-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`${isOpen ? "mr-3" : ""}`}>
                          {item.icon}
                        </span>
                        {isOpen && <span>{item.label}</span>}
                      </div>
                      {isOpen && (
                        expandedMenus[item.key] ? 
                          <FaChevronDown className="w-4 h-4" /> : 
                          <FaChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {(isOpen && expandedMenus[item.key]) && (
                      <ul className="pl-6 mt-1 space-y-1">
                        {item.submenu.map(subItem => (
                          <li key={subItem.id}>
                            <Link
                              to={subItem.path}
                              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                                isActive(subItem.path)
                                  ? "bg-blue-600 text-white"
                                  : "text-blue-100 hover:bg-blue-500 hover:text-white"
                              }`}
                            >
                              <span className="mr-2">{subItem.icon}</span>
                              <span>{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Compact submenu icons when sidebar is collapsed */}
                    {(!isOpen && expandedMenus[item.key]) && (
                      <div className="mt-1 space-y-1 flex flex-col items-center">
                        {item.submenu.map(subItem => (
                          <Link
                            key={subItem.id}
                            to={subItem.path}
                            className={`flex items-center justify-center p-2 w-12 h-12 rounded-md transition-colors duration-200 ${
                              isActive(subItem.path)
                                ? "bg-blue-600 text-white"
                                : "text-blue-100 hover:bg-blue-500 hover:text-white"
                            }`}
                            title={subItem.label}
                          >
                            {subItem.icon}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      isOpen ? "px-4" : "justify-center px-2"
                    } py-3 rounded-lg transition-colors duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-800 text-white font-medium"
                        : "text-blue-100 hover:bg-blue-600"
                    }`}
                  >
                    <span className={`${isOpen ? "mr-3" : ""}`}>
                      {item.icon}
                    </span>
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-6 border-t border-blue-800">
            <button
              className={`flex items-center ${
                isOpen ? "px-4" : "justify-center px-2"
              } py-3 w-full rounded-lg text-blue-100 hover:bg-red-600 transition-colors duration-200`}
            >
              <FaSignOutAlt className={`${isOpen ? "mr-3" : "mx-auto"} w-5 h-5`} />
              {isOpen && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* User profile at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800 ${isOpen ? "" : "flex justify-center"}`}>
        <div className={`flex ${isOpen ? "" : "flex-col"} items-center`}>
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            U
          </div>
          {isOpen && (
            <div className="ml-3">
              <div className="text-sm font-medium text-white">User Name</div>
              <div className="text-xs text-blue-200">user@example.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;