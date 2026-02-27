import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../lib/api";

const AdminSlots = () => {
  const [temples, setTemples] = useState([]);
  const [templeId, setTempleId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState(10);
  const [price, setPrice] = useState(100);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/temples");
        if (Array.isArray(data)) setTemples(data);
      } catch { /* noop */ }
    })();
  }, []);

  const refresh = async (tid, d) => {
    if (!tid) return setList([]);
    try {
      const { data } = await api.get(`/api/slots?templeId=${tid}${d ? `&date=${d}` : ""}`);
      setList(Array.isArray(data) ? data : []);
    } catch { setList([]); }
  };

  const onCreate = async (e) => {
    e.preventDefault();
    setMsg(""); setErr("");
    if (!templeId || !date || !startTime || !endTime) {
      setErr("Please fill all fields");
      return;
    }
    try {
      await api.post("/api/slots", { templeId, date, startTime, endTime, availableSeats: Number(availableSeats), price: Number(price) });
      setMsg("Slot created");
      refresh(templeId, date);
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to create");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-10">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Manage Darshan Slots</h1>
          {msg && <div className="alert alert-success mb-3"><span>{msg}</span></div>}
          {err && <div className="alert alert-error mb-3"><span>{err}</span></div>}
          <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="label">Temple</label>
              <select className="select select-bordered w-full" value={templeId} onChange={(e)=>{ setTempleId(e.target.value); refresh(e.target.value, date); }}>
                <option value="" disabled>Select temple</option>
                {temples.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Date</label>
              <input type="date" className="input input-bordered w-full" value={date} onChange={(e)=>{ setDate(e.target.value); refresh(templeId, e.target.value); }}/>
            </div>
            <div>
              <label className="label">Start Time</label>
              <input className="input input-bordered w-full" placeholder="06:00 AM" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
            </div>
            <div>
              <label className="label">End Time</label>
              <input className="input input-bordered w-full" placeholder="07:00 AM" value={endTime} onChange={(e)=>setEndTime(e.target.value)}/>
            </div>
            <div>
              <label className="label">Seats</label>
              <input type="number" className="input input-bordered w-full" value={availableSeats} onChange={(e)=>setAvailableSeats(e.target.value)}/>
            </div>
            <div>
              <label className="label">Price</label>
              <input type="number" className="input input-bordered w-full" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Create Slot</button>
          </form>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Existing Slots</h2>
            {list.length === 0 ? (
              <div className="alert"><span>No slots for selected filters.</span></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Seats</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map(s => (
                      <tr key={s._id}>
                        <td>{s.date}</td>
                        <td>{s.startTime} - {s.endTime}</td>
                        <td>{s.availableSeats}</td>
                        <td>₹{s.price}</td>
                        <td><a className="btn btn-sm" href={`/book?temple=${encodeURIComponent((temples.find(t=>t._id===templeId)?.name)||"")}&slotId=${s._id}`}>Book</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminSlots;
