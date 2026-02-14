// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";

// import Home from "./pages/Home";
// import Services from "./pages/Services";
// import Login from "./admin/Login";
// import Dashboard from "./admin/Dashboard";
// import { FaWhatsapp } from "react-icons/fa";
// import Leads from "./admin/Leads";
// import Documents from "./admin/Documents";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminServices from "./admin/Services";
// import AdminGallery from "./pages/admin/Gallery";
// import Gallery from "./pages/Gallery";
// import { useState } from "react";
// import AdminLayout from "../../admin/AdminLayout";






// function App() {

//   const [dark, setDark] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:bg-neutral-900">


//       {/* DARK MODE BUTTON */}
//       <button
//         onClick={() => setDark(!dark)}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           background: "#2563eb",
//           color: "white",
//           padding: "10px 16px",
//           borderRadius: "999px",
//           zIndex: 9999,
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         {dark ? "☀️ Light" : "🌙 Dark"}
//       </button>

//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/admin/login" element={<Login />} />
//           <Route path="/admin/dashboard" element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/admin/leads" element={<Leads />} />
//           <Route path="/admin/documents" element={<Documents />} />
//           <Route
//             path="/admin/services"
//             element={
//               <ProtectedRoute>
//                 <AdminServices />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/admin/gallery" element={<AdminGallery />} />
//           <Route path="/gallery" element={<Gallery />} />
//         </Routes>
//         <Route path="/admin/poster" element={<AdminPoster />} />
//       </BrowserRouter>

//       {/* Floating WhatsApp Button */}
// <button
//   onClick={async () => {

//     try {
//       await fetch("http://localhost:5000/api/leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           page: window.location.pathname,
//         }),
//       });

//     } catch (err) {
//       console.error("Lead error:", err);
//     }

//     window.open(
//       "https://wa.me/919482272307?text=Hi%2C%20I%20want%20to%20know%20about%20your%20services.",
//       "_blank"
//     );
//   }}

//   className="
// fixed bottom-20 right-6 
// bg-green-500 text-white p-4 rounded-full shadow-xl
// hover:bg-green-600 hover:scale-110
// transition-all duration-300 ease-in-out
// z-50 flex items-center justify-center
// whatsapp-pulse
// "
// >
//   <FaWhatsapp size={30} className="whatsapp-icon" />
// </button>



//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Services from "./pages/Services";

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Leads from "./admin/Leads";
import Documents from "./admin/Documents";
import AdminServices from "./admin/Services";

import AdminGallery from "./pages/admin/Gallery";
import Gallery from "./pages/Gallery";

import AdminPoster from "./pages/admin/AdminPoster"; // ✅ ADD THIS

import ProtectedRoute from "./components/ProtectedRoute";

import { FaWhatsapp } from "react-icons/fa";

function App() {

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:bg-neutral-900">

      {/* DARK MODE BUTTON */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#2563eb",
          color: "white",
          padding: "10px 16px",
          borderRadius: "999px",
          zIndex: 9999,
          border: "none",
          cursor: "pointer",
        }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>


      <BrowserRouter>

        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />


          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/leads" element={<Leads />} />

          <Route path="/admin/documents" element={<Documents />} />

          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <AdminServices />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/gallery" element={<AdminGallery />} />

          {/* ✅ POSTER ROUTE FIXED */}
          <Route
            path="/admin/poster"
            element={
              <ProtectedRoute>
                <AdminPoster />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>


      {/* Floating WhatsApp Button */}
      <button
        onClick={async () => {

          try {
            await fetch("http://localhost:5000/api/leads", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                page: window.location.pathname,
              }),
            });

          } catch (err) {
            console.error("Lead error:", err);
          }

          window.open(
            "https://wa.me/919482272307?text=Hi%2C%20I%20want%20to%20know%20about%20your%20services.",
            "_blank"
          );
        }}

        className="
        fixed bottom-20 right-6 
        bg-green-500 text-white p-4 rounded-full shadow-xl
        hover:bg-green-600 hover:scale-110
        transition-all duration-300 ease-in-out
        z-50 flex items-center justify-center
        whatsapp-pulse
        "
      >
        <FaWhatsapp size={30} className="whatsapp-icon" />
      </button>


    </div>
  );
}

export default App;
