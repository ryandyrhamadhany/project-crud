import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const dummyData = [
  { id: 1, nama: "Alpha", email: "alpha@example.com", status: "Active", role: "Admin" },
  { id: 2, nama: "Beta", email: "beta@example.com", status: "Active", role: "User" },
  { id: 3, nama: "Delta", email: "delta@example.com", status: "Inactive", role: "Editor" },
  { id: 4, nama: "Sigma", email: "sigma@example.com", status: "Active", role: "User" },
];

// Data for charts
const roleData = [
  { name: 'Admin', value: 1 },
  { name: 'User', value: 2 },
  { name: 'Editor', value: 1 },
];

const statusData = [
  { name: 'Active', value: 3 },
  { name: 'Inactive', value: 1 },
];

const monthlyUsersData = [
  { name: 'Jan', users: 4 },
  { name: 'Feb', users: 7 },
  { name: 'Mar', users: 10 },
  { name: 'Apr', users: 15 },
  { name: 'May', users: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Project Dashboard Visual⚡</h2>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-800">{dummyData.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow border border-green-100">
            <h3 className="text-lg font-semibold text-green-700">Active Users</h3>
            <p className="text-3xl font-bold text-green-800">3</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow border border-red-100">
            <h3 className="text-lg font-semibold text-red-700">Inactive Users</h3>
            <p className="text-3xl font-bold text-red-800">1</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700">Admin Users</h3>
            <p className="text-3xl font-bold text-purple-800">1</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Roles Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">User Roles Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* User Status Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">User Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Users" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly User Growth */}
          <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;