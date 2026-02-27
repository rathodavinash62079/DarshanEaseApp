import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../lib/api";

const TempleDetails = () => {
  const { slug } = useParams();
  const name = useMemo(() => slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), [slug]);
  const [templeId, setTempleId] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/temples");
        const t = Array.isArray(data) ? data.find(x => String(x.name).toLowerCase() === name.toLowerCase()) : null;
        if (t?._id) {
          setTempleId(t._id);
          const resp = await api.get(`/api/slots?templeId=${t._id}`);
          setSlots(Array.isArray(resp.data) ? resp.data : []);
        }
      } catch (e) { void e; }
    })();
  }, [name]);
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
          {templeId && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Darshan Slots</h2>
              {slots.length === 0 ? (
                <div className="alert"><span>No slots available.</span></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slots.map(s => (
                    <div key={s._id} className="card bg-white shadow">
                      <div className="card-body">
                        <h3 className="card-title">{s.date}</h3>
                        <p>Time: {s.startTime} - {s.endTime}</p>
                        <p>Seats: {s.availableSeats}</p>
                        <p>Price: ₹{s.price}</p>
                        <a href={`/book?temple=${encodeURIComponent(name)}&slotId=${s._id}`} className="btn btn-primary mt-2">
                          Book Now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TempleDetails;
