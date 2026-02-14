import { useEffect, useState } from "react";
import { FaWhatsapp, FaFileAlt } from "react-icons/fa";

function Services() {

  const [services, setServices] = useState([]);
  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Get token (for protected routes)
  const token = localStorage.getItem("adminToken");


  // ---------------- LOAD SERVICES ----------------
  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/services`)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }

      })
      .catch(err => {
        console.error("Service load error:", err);
        setServices([]);
      });

  }, []);



  // ---------------- LOAD DOCUMENTS ----------------
  const loadDocs = async (id) => {

    try {

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setDocs([]);
        setShow(true);
        return;
      }

      if (Array.isArray(data)) {
        setDocs(data);
      } else {
        setDocs([]);
      }

      setShow(true);

    } catch (err) {

      console.error("Docs load failed:", err);
      setDocs([]);
      setShow(true);
    }
  };



  // ---------------- FILTER ----------------
  const filtered = services.filter(s =>
    (category === "All" || s.category === category) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 px-6 py-16">

      <h2 className="text-4xl font-bold text-center mb-12">
        Our Services
      </h2>


      {/* Search + Filter */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 mb-10">

        <input
          placeholder="Search service..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg shadow border outline-none"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-3 rounded-lg shadow border outline-none"
        >
          <option>All</option>
          <option>Government</option>
          <option>Insurance</option>
          <option>Banking</option>
          <option>Others</option>
        </select>

      </div>



      {/* ---------------- SERVICE CARDS ---------------- */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filtered.map(service => (

          <div
            key={service.id}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow
                       hover:shadow-xl transition flex flex-col"
          >

            {/* ---------- SERVICE IMAGE ---------- */}
            <div className="flex justify-center mb-4">

              {service.image ? (

                <img
                  src={`http://localhost:5000${service.image}`}
                  alt={service.name}
                  className="w-24 h-24 object-cover rounded-full border shadow"
                />

              ) : (

                <div className="w-24 h-24 rounded-full bg-gray-100
                                flex items-center justify-center text-gray-400">

                  <FaFileAlt size={32} />

                </div>

              )}

            </div>


            {/* ---------- TITLE ---------- */}
            <h3 className="font-semibold text-lg text-center mb-2">
              {service.name}
            </h3>


            {/* ---------- DESCRIPTION ---------- */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center flex-grow">
              {service.description}
            </p>


            {/* ---------- ACTIONS ---------- */}
            <div className="flex justify-between items-center mt-4">

              <button
                onClick={() => loadDocs(service.id)}
                className="text-blue-600 hover:underline font-medium"
              >
                View Documents
              </button>

              <a
                href="https://wa.me/919482272307"
                target="_blank"
                rel="noreferrer"
                className="text-green-600 font-medium flex items-center gap-1"
              >
                <FaWhatsapp /> Enquire
              </a>

            </div>

          </div>

        ))}

      </div>



      {/* ---------------- DOCUMENTS MODAL ---------------- */}
      {show && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-full max-w-sm">

            <h3 className="font-bold text-lg mb-4">
              Required Documents
            </h3>


            {docs.length === 0 ? (

              <p className="text-gray-500 text-center">
                No documents available.
              </p>

            ) : (

              <ul className="space-y-2">

                {Array.isArray(docs) && docs.map(d => (

                  <li
                    key={d.id}
                    className="flex items-center gap-2"
                  >
                    📄 {d.document_name}
                  </li>

                ))}

              </ul>

            )}


            <button
              onClick={() => setShow(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded
                         hover:bg-blue-700 transition"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Services;
