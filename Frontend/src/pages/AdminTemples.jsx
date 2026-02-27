import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminTemples = () => {
  const [temples, setTemples] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      try {
        const data = JSON.parse(localStorage.getItem("admin_temples") || "[]");
        setTemples(Array.isArray(data) ? data : []);
      } catch { setTemples([]); }
    }, 0);
  }, []);

  const save = (list) => {
    setTemples(list);
    localStorage.setItem("admin_temples", JSON.stringify(list));
  };

  const addTemple = (e) => {
    e.preventDefault();
    if (!name || !location || !image) return;
    const list = [...temples, { name, location, image }];
    save(list);
    setName(""); setLocation(""); setImage("");
  };

  const removeTemple = (idx) => {
    const list = temples.filter((_, i) => i !== idx);
    save(list);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-10">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Admin: Manage Temples</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={addTemple} className="bg-white p-4 rounded shadow space-y-3">
              <h2 className="font-semibold">Add Temple</h2>
              <input value={name} onChange={(e)=>setName(e.target.value)} className="input input-bordered w-full" placeholder="Temple Name" />
              <input value={location} onChange={(e)=>setLocation(e.target.value)} className="input input-bordered w-full" placeholder="Location" />
              <input value={image} onChange={(e)=>setImage(e.target.value)} className="input input-bordered w-full" placeholder="Image URL" />
              <button className="btn btn-primary w-full">Add</button>
            </form>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Current Temples ({temples.length})</h2>
              {temples.length === 0 ? (
                <div className="alert">No admin-added temples.</div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {temples.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 border p-2 rounded">
                      <img src={t.image} alt={t.name} className="h-14 w-20 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-gray-500">{t.location}</div>
                      </div>
                      <button className="btn btn-error btn-sm" onClick={()=>removeTemple(i)}>Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminTemples;
