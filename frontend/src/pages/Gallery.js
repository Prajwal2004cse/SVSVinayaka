import { useEffect, useState } from "react";

function Gallery() {

  const [images, setImages] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {

    try {

      const res = await fetch(`${API}/api/gallery`);
      const data = await res.json();

      setImages(data);

    } catch (err) {
      console.error("Gallery load error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 px-6 py-16">

      <h2 className="text-4xl font-bold text-center mb-12">
        Our Gallery
      </h2>

      {images.length === 0 ? (

        <p className="text-center text-gray-500">
          No images uploaded yet.
        </p>

      ) : (

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {images.map(img => (

            <div
              key={img.id}
              className="overflow-hidden rounded-xl shadow hover:shadow-xl transition"
            >

              <img
                src={`${API}${img.image_url}`}
                alt="Gallery"
                className="w-full h-60 object-cover hover:scale-105 transition duration-300"
              />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Gallery;
