import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Placeholder components for other routes
const ProfileAdmin = () => <div className="p-6"><h2 className="text-2xl font-bold mb-4">Profile Admin Page</h2></div>;
const TambahData = () => <div className="p-6"><h2 className="text-2xl font-bold mb-4">Tambah Data User Page</h2></div>;

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <div className=" bg-white rounded-lg shadow-md">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile_admin" element={<ProfileAdmin />} />
              <Route path="/users" element={<Users />} />
              <Route path="/tambah" element={<TambahData />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;