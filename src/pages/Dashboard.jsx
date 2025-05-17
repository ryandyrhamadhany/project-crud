import React from "react";
import { users, roleData, statusData, monthlyUsersData } from "../utils/dummyData";
import { Card } from "../components/Card";
import { ChartCard } from "../components/ChartCard";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, CartesianGrid, XAxis, YAxis, Bar,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import { FaUsers, FaUserCheck, FaUserSlash, FaUserShield } from "react-icons/fa";

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const Dashboard = () => {
  // Calculate percentages for the cards
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const adminUsers = users.filter(u => u.role === 'Admin').length;
  
  const activePercentage = Math.round((activeUsers / totalUsers) * 100);
  const inactivePercentage = Math.round((inactiveUsers / totalUsers) * 100);
  const adminPercentage = Math.round((adminUsers / totalUsers) * 100);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      {/* Header with greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to your user management dashboard</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Total Users" 
          value={totalUsers} 
          color="indigo" 
          icon={<FaUsers size={24} />}
          subtitle="All registered users"
        />
        <Card 
          title="Active Users" 
          value={activeUsers} 
          color="emerald" 
          percentage={activePercentage}
          icon={<FaUserCheck size={24} />}
          subtitle={`${activePercentage}% of total users`}
        />
        <Card 
          title="Inactive Users" 
          value={inactiveUsers} 
          color="amber" 
          percentage={inactivePercentage}
          icon={<FaUserSlash size={24} />}
          subtitle={`${inactivePercentage}% of total users`}
        />
        <Card 
          title="Admin Users" 
          value={adminUsers} 
          color="rose" 
          percentage={adminPercentage}
          icon={<FaUserShield size={24} />}
          subtitle={`${adminPercentage}% of total users`}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="User Roles Distribution" 
          subtitle="Breakdown of users by assigned role"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={roleData} 
                dataKey="value" 
                nameKey="name"
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                fill="#8884d8"
                paddingAngle={2}
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {roleData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="User Status" 
          subtitle="Distribution of user account statuses"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <Bar dataKey="value" name="Users" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Monthly User Growth" 
          subtitle="New user registrations over the past year"
          fullWidth
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyUsersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Activity Section */}
      <ChartCard 
        title="Recent Activity" 
        subtitle="Latest user management actions"
      >
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center p-3 rounded-lg border border-gray-100 bg-white">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {i % 2 === 0 ? <FaUserCheck size={20} /> : <FaUsers size={20} />}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {i % 2 === 0 ? 'New user created' : 'User status updated'}
                </p>
                <p className="text-xs text-gray-500">
                  {`${i + 1} hour${i !== 0 ? 's' : ''} ago`}
                </p>
              </div>
              <div className="text-xs font-medium text-gray-500">Admin</div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
};

export default Dashboard;