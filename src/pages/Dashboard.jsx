import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Dashboard</h1>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
};

export default Dashboard;
