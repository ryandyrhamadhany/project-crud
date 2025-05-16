// src/utils/dummyData.js
export const users = [
    { id: 1, nama: "Alpha", email: "alpha@example.com", status: "Active", role: "Admin" },
    { id: 2, nama: "Beta", email: "beta@example.com", status: "Active", role: "User" },
    { id: 3, nama: "Delta", email: "delta@example.com", status: "Inactive", role: "Editor" },
    { id: 4, nama: "Sigma", email: "sigma@example.com", status: "Active", role: "User" },
    { id: 5, nama: "Omega", email: "omega@example.com", status: "Active", role: "User" },
  ];
  
  export const roleData = [
    { name: 'Admin', value: 1 },
    { name: 'User', value: 3 },
    { name: 'Editor', value: 1 },
  ];
  
  export const statusData = [
    { name: 'Active', value: 4 },
    { name: 'Inactive', value: 1 },
  ];
  
  export const monthlyUsersData = [
    { name: 'Jan', users: 4 },
    { name: 'Feb', users: 7 },
    { name: 'Mar', users: 10 },
    { name: 'Apr', users: 15 },
    { name: 'May', users: 20 },
  ];