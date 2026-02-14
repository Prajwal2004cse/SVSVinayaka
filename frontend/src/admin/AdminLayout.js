import { Link } from "react-router-dom";


import {
  FaHome,
  FaList,
  FaFileAlt,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">

        <h2 className="text-xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-4">

          <Link to="/admin/dashboard" className="flex items-center gap-3 hover:text-blue-400">
            <FaHome /> Dashboard
          </Link>

          <Link to="/admin/leads" className="flex items-center gap-3 hover:text-blue-400">
            <FaChartLine /> Leads
          </Link>

          <Link to="/admin/documents" className="flex items-center gap-3 hover:text-blue-400">
            <FaFileAlt /> Documents
          </Link>

          <Link to="/admin/services" className="flex items-center gap-3 hover:text-blue-400">
            <FaList /> Services
          </Link>

          <Link to="/admin/gallery" className="flex items-center gap-3 hover:text-blue-400">
            <FaList /> Gallery
          </Link>

          {/* <Link to="/admin/gallery" className="flex items-center gap-3 p-3 rounded hover:bg-blue-600">
          <FaList />📸 Gallery
          </Link> */}
          <Link to="/admin/poster" className="flex items-center gap-3 hover:text-blue-400">
            <FaList /> Poster Upload
          </Link>

          {/* <Link to="/admin/poster">
            <FaList>Poster</FaList>
          </Link>      */}



          <Link to="/admin/login" className="flex items-center gap-3 text-red-400 mt-10">
            <FaSignOutAlt /> Logout
          </Link>

        </nav>

      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50 dark:bg-slate-950 p-8">
        {children}
      </main>

    </div>
  );
}

export default AdminLayout;
