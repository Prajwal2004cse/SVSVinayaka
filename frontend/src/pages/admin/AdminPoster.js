import { useState } from "react";
import AdminLayout from "../../admin/AdminLayout";


function AdminPoster() {

  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);

  const API = process.env.REACT_APP_API_URL;

  // Handle file select
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    setPoster(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };


  // Upload poster
  const uploadPoster = async () => {

    if (!poster) {
      alert("Please select image");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("image", poster);

      const res = await fetch(`${API}/api/poster/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      alert(data.msg);

      setPoster(null);
      setPreview(null);

    } catch (err) {

      console.error(err);
      alert("Upload failed");

    }

  };


  return (

    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Upload Poster
      </h2>


      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow max-w-md">

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />


        {/* Preview */}
        {preview && (

          <img
            src={preview}
            alt="Preview"
            className="mb-4 rounded shadow"
          />

        )}


        {/* Upload button */}
        <button
          onClick={uploadPoster}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Poster
        </button>


      </div>

    </AdminLayout>

  );

}

export default AdminPoster;
