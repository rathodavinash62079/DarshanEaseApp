import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TempleDetails = () => {
  const { slug } = useParams();
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-10">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              alt={name}
              className="w-full h-64 object-cover rounded"
              src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a"
            />
            <div>
              <p className="mb-3">Location: India</p>
              <p className="mb-4">
                A revered temple known for its spiritual significance and rich heritage. Devotees
                can experience a peaceful darshan and participate in special puja services.
              </p>
              <div className="aspect-video rounded overflow-hidden bg-black">
                <iframe
                  title="Virtual Darshan"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/21X5lGlDOfg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TempleDetails;
