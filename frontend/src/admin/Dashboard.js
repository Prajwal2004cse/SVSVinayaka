import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

function Dashboard() {

  const [stats, setStats] = useState({
    services: 0,
    documents: 0,
    leads: 0,
    popular: "N/A",
  });

  useEffect(() => {

    const token = localStorage.getItem("adminToken");

    fetch(`${process.env.REACT_APP_API_URL}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <AdminLayout>

      <h2 className="text-2xl font-bold mb-8">
        Dashboard Overview
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Services</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.services}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Documents</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.documents}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Leads</h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.leads}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Popular Page</h3>
          <p className="text-xl font-semibold text-orange-600">
            {stats.popular}
          </p>
        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;
