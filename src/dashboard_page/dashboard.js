import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
   const navigate = useNavigate();
   return (
      <div>
         <h1>Home Page DashBoard</h1>
         <button type="button" onClick={() => navigate("/")}>Log Out</button>
      </div>
   );
}

export default DashboardHome;
