import { useEffect, useState } from "react";

function Gallery() {

  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get admin token
  const token = localStorage.getItem("adminToken");



  // Load gallery images
  const loadImages = async () => {

    try {

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gallery`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setImages(data);
      } else {
        setImages([]);
      }

    } catch (err) {

      console.error("Gallery load error:", err);
      setImages([]);
    }
  };



  useEffect(() => {
    loadImages();
  }, []);




  // Upload image
  const uploadImage = async () => {

    if (!file) {
      return alert("Please select an image first");
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gallery`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      alert("Image uploaded successfully");

      setFile(null);

      loadImages();

    } catch (err) {

      console.error("Upload error:", err);
      alert("Image upload failed");

    } finally {

      setLoading(false);
    }
  };




  // Delete image
  const deleteImage = async (id) => {

    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/gallery/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Image deleted");

      loadImages();

    } catch (err) {

      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };




  return (
    <div className="p-8 max-w-6xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Gallery Manager
      </h2>



      {/* Upload Section */}
      <div className="mb-8 flex gap-4 items-center">

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button
          onClick={uploadImage}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

      </div>




      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {images.length === 0 ? (

          <p className="text-gray-500 col-span-full text-center">
            No images uploaded yet
          </p>

        ) : (

          images.map(img => (

            <div
              key={img.id}
              className="relative border rounded-lg overflow-hidden shadow"
            >

              <img
                src={`${process.env.REACT_APP_API_URL}${img.image_url}`}
                alt="Gallery"
                className="h-40 w-full object-cover"
              />

              <button
                onClick={() => deleteImage(img.id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
              >
                ✕
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Gallery;
