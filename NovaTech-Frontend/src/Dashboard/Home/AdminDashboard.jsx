import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#4f46e5',
        data: [3000, 5000, 4000, 6000, 7000],
      },
    ],
  };

  const pieData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Others'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444'],
      },
    ],
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold">1,240</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Categories</h2>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">587</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Admins</h2>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Monthly Sales</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Product Category Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
