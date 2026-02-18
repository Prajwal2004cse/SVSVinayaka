import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

function AdminServices() {

  const [services, setServices] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Government");
  const [image, setImage] = useState(null);

  const [editId, setEditId] = useState(null);

  // Get token
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

// Load services
const loadServices = async () => {

  try {

    const token = getToken();

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/services`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log("Admin services response:", data);

    // ✅ FIX HERE
    if (data?.success && Array.isArray(data.data)) {
      setServices(data.data);
    }
    else if (Array.isArray(data)) {
      setServices(data);
    }
    else {
      setServices([]);
    }

  } catch (err) {

    console.error("Load services error:", err);
    setServices([]);

  }

};


  // Add / Update Service
  const saveService = async () => {

    if (!name || !description) {
      alert("Please fill all fields");
      return;
    }

    try {

      const token = getToken();

      // Create FormData
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      // UPDATE
      if (editId) {

        await fetch(
          `${process.env.REACT_APP_API_URL}/api/services/${editId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        setEditId(null);

      }

      // ADD
      else {

        await fetch(
          `${process.env.REACT_APP_API_URL}/api/services`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

      }

      // Clear form
      setName("");
      setDescription("");
      setCategory("Government");
      setImage(null);

      document.getElementById("imageInput").value = "";

      loadServices();

      alert("Service saved successfully!");

    } catch (err) {
      console.error("Save error:", err);
      alert("Upload failed!");
    }
  };

  // Edit service
  const editService = (service) => {

    setEditId(service.id);
    setName(service.name);
    setDescription(service.description);
    setCategory(service.category);
    setImage(null);
  };

  // Delete service
  const deleteService = async (id) => {

    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {

      const token = getToken();

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/services/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadServices();

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Manage Services
      </h2>

      {/* Add / Edit Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-8">

        <h3 className="font-semibold mb-4">
          {editId ? "Edit Service" : "Add New Service"}
        </h3>

        <div className="grid md:grid-cols-5 gap-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded outline-none"
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded outline-none"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded outline-none"
          >
            <option>Government</option>
            <option>Insurance</option>
            <option>Banking</option>
            <option>Others</option>
          </select>

          {/* Image Upload */}
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 border rounded outline-none"
          />

          {/* Button */}
          <button
            onClick={saveService}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
          >
            {editId ? "Update" : "Add"}
          </button>

        </div>

      </div>

      {/* Services Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h3 className="font-semibold mb-4">
          Services List
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead className="bg-gray-100 dark:bg-slate-700">

              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Actions</th>
              </tr>

            </thead>

            <tbody>

              {services.length === 0 ? (

                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No services found
                  </td>
                </tr>

              ) : (

                Array.isArray(services) && services.map((s) => (

                  <tr
                    key={s.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700"
                  >

                    {/* Image */}
                    <td className="border p-2 text-center">

                      {s.image ? (

                        <img
                          src={`${process.env.REACT_APP_API_URL}${s.image}`}
                          alt={s.name}
                          className="w-12 h-12 rounded-full object-cover mx-auto"
                        />

                      ) : (

                        <span className="text-gray-400 text-sm">
                          No Image
                        </span>

                      )}

                    </td>

                    {/* Name */}
                    <td className="border p-2">
                      {s.name}
                    </td>

                    {/* Category */}
                    <td className="border p-2 text-center">
                      {s.category}
                    </td>

                    {/* Actions */}
                    <td className="border p-2 text-center space-x-3">

                      <button
                        onClick={() => editService(s)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteService(s.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminServices;
