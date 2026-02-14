import { useEffect, useState } from "react";

function Documents() {

  const [services, setServices] = useState([]);
  const [docs, setDocs] = useState([]);

  const [serviceId, setServiceId] = useState("");
  const [docName, setDocName] = useState("");

  const [loading, setLoading] = useState(false);

  // Get token
  const token = localStorage.getItem("adminToken");



  // Common headers
  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };



  // Load services
  useEffect(() => {

    const loadServices = async () => {

      try {

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/services`,
          {
            headers: authHeaders,
          }
        );

        if (!res.ok) throw new Error("Failed to load services");

        const data = await res.json();

        setServices(data);

      } catch (err) {

        console.error("Service load error:", err);
        alert("Failed to load services");

      }
    };

    loadServices();

  }, [token]);



  // Load docs
  const loadDocs = async (id) => {

    if (!id) return;

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/documents/${id}`,
        {
          headers: authHeaders,
        }
      );

      if (!res.ok) throw new Error("Failed to load docs");

      const data = await res.json();

      setDocs(data);

    } catch (err) {

      console.error("Load docs error:", err);
      alert("Failed to load documents");

    } finally {

      setLoading(false);
    }
  };



  // Add doc
  const addDoc = async () => {

    if (!serviceId || !docName.trim()) {
      return alert("Please fill all fields");
    }

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/documents`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },

          body: JSON.stringify({
            service_id: serviceId,
            document_name: docName.trim(),
          }),
        }
      );

      if (!res.ok) throw new Error("Add failed");

      setDocName("");

      await loadDocs(serviceId);

      alert("Document added successfully");

    } catch (err) {

      console.error("Add doc error:", err);
      alert("Failed to add document");

    } finally {

      setLoading(false);
    }
  };



  // Delete doc
  const deleteDoc = async (id) => {

    if (!window.confirm("Delete this document?")) return;

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/documents/${id}`,
        {
          method: "DELETE",
          headers: authHeaders,
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      await loadDocs(serviceId);

      alert("Document deleted");

    } catch (err) {

      console.error("Delete error:", err);
      alert("Failed to delete document");

    } finally {

      setLoading(false);
    }
  };



  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Manage Service Documents
      </h2>


      {/* Add Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-8">

        <div className="grid md:grid-cols-3 gap-4">

          <select
            value={serviceId}
            onChange={(e) => {
              const id = e.target.value;
              setServiceId(id);
              loadDocs(id);
            }}
            className="p-3 rounded border"
          >

            <option value="">Select Service</option>

            {services.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}

          </select>


          <input
            placeholder="Document name"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            className="p-3 rounded border"
          />


          <button
            onClick={addDoc}
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Add Document"}
          </button>

        </div>

      </div>



      {/* List */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h3 className="font-semibold mb-4">
          Documents List
        </h3>


        {loading ? (

          <p className="text-gray-500">
            Loading...
          </p>

        ) : docs.length === 0 ? (

          <p className="text-gray-500">
            No documents yet
          </p>

        ) : (

          <ul className="space-y-2">

            {docs.map(d => (

              <li
                key={d.id}
                className="flex justify-between items-center border-b pb-2"
              >

                <span>📄 {d.document_name}</span>

                <button
                  onClick={() => deleteDoc(d.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

              </li>

            ))}

          </ul>

        )}

      </div>

    </div>
  );
}

export default Documents;
