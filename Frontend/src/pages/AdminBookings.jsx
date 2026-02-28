import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../lib/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [err, setErr] = useState("");
  const [needLogin, setNeedLogin] = useState(false);

  const load = async () => {
    setErr("");
    setNeedLogin(false);
    try {
      const { data } = await api.get("/api/book");
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        setNeedLogin(true);
        setErr("Please login to view bookings");
      } else {
        setErr(e?.response?.data?.error || "Failed to load bookings");
      }
      setBookings([]);
    }
  };

  useEffect(() => {
    load();
    const onAuth = () => load();
    window.addEventListener("darshan-auth-change", onAuth);
    window.addEventListener("storage", onAuth);
    return () => {
      window.removeEventListener("darshan-auth-change", onAuth);
      window.removeEventListener("storage", onAuth);
    };
  }, []);

  const remove = async (idx) => {
    const b = bookings[idx];
    const id = b?._id;
    if (!id) {
      const list = bookings.filter((_, i) => i !== idx);
      setBookings(list);
      return;
    }
    try {
      await api.delete(`/api/book/${id}`);
      await load();
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to delete booking");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-10">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Admin: Manage Bookings</h1>
            <button className="btn btn-outline" onClick={load}>Refresh</button>
          </div>
          {err && (
            <div className="alert alert-error mb-3">
              <span>{err}</span>
              {needLogin && (
                <button
                  className="btn btn-sm ml-3"
                  onClick={() => document.getElementById("my_modal_3")?.showModal()}
                >
                  Login
                </button>
              )}
            </div>
          )}
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="table">
              <thead>
                <tr>
                  <th>Temple</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr key={idx}>
                    <td>{b.temple}</td>
                    <td>{b.service}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>{b.fullName || "-"}</td>
                    <td>₹{b.amount ?? b.totalAmount ?? "-"}</td>
                    <td>{b.paymentMethod || "-"}</td>
                    <td><button className="btn btn-error btn-xs" onClick={()=>remove(idx)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminBookings;
