import { useEffect, useState } from "react";

function Documents() {

  const [services, setServices] = useState([]);
  const [docs, setDocs] = useState([]);

  const [serviceId, setServiceId] = useState("");
  const [docName, setDocName] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };


  // ================= LOAD SERVICES =================
  useEffect(() => {

    const loadServices = async () => {

      try {

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/services`,
          {
            headers: authHeaders,
          }
        );

        const data = await res.json();

        console.log("Admin services response:", data);

        // FIX: Railway response
        if (data?.success && Array.isArray(data.data)) {

          setServices(data.data);

        } else if (Array.isArray(data)) {

          setServices(data);

        } else {

          setServices([]);

        }

      } catch (err) {

        console.error("Service load error:", err);
        setServices([]);

      }
    };

    loadServices();

  }, [token]);



  // ================= LOAD DOCUMENTS =================
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

      const data = await res.json();

      console.log("Documents response:", data);

      // FIX: Railway response
      if (data?.success && Array.isArray(data.data)) {

        setDocs(data.data);

      } else if (Array.isArray(data)) {

        setDocs(data);

      } else {

        setDocs([]);

      }

    } catch (err) {

      console.error("Load docs error:", err);
      setDocs([]);

    } finally {

      setLoading(false);

    }
  };



  // ================= ADD DOCUMENT =================
  const addDoc = async () => {

    if (!serviceId || !docName.trim()) {

      alert("Please fill all fields");
      return;

    }

    try {

      setLoading(true);

      await fetch(
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

      setDocName("");

      loadDocs(serviceId);

      alert("Document added successfully");

    } catch (err) {

      console.error(err);
      alert("Failed to add document");

    } finally {

      setLoading(false);

    }
  };



  // ================= DELETE DOCUMENT =================
  const deleteDoc = async (id) => {

    if (!window.confirm("Delete this document?")) return;

    try {

      setLoading(true);

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/documents/${id}`,
        {
          method: "DELETE",
          headers: authHeaders,
        }
      );

      loadDocs(serviceId);

      alert("Document deleted");

    } catch (err) {

      console.error(err);
      alert("Delete failed");

    } finally {

      setLoading(false);

    }
  };



  // ================= UI =================
  return (

    <div className="p-8 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Manage Service Documents
      </h2>


      {/* ADD FORM */}
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

            {Array.isArray(services) && services.map(s => (

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
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Add Document"}
          </button>

        </div>

      </div>



      {/* DOCUMENT LIST */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h3 className="font-semibold mb-4">
          Documents List
        </h3>


        {loading ? (

          <p>Loading...</p>

        ) : !Array.isArray(docs) || docs.length === 0 ? (

          <p>No documents yet</p>

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
                  className="text-red-600"
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
