import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../lib/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const points = useMemo(() => bookings.length * 10, [bookings.length]);

  useEffect(() => {
    (async () => {
      try {
        const localList = JSON.parse(localStorage.getItem("darshan_bookings") || "[]");
        let apiList = [];
        try {
          const { data } = await api.get("/api/book/mybooking");
          if (Array.isArray(data)) apiList = data;
        } catch (e) { void e; }
        const normalizedApi = apiList.map(b => ({
          _id: b._id,
          temple: b.temple,
          service: b.service,
          date: b.date,
          time: b.time,
          fullName: b.fullName || "",
          email: b.email || "",
          phone: b.phone || "",
          quantity: b.quantity || 1,
          amount: b.amount || 0,
          totalAmount: b.totalAmount || 0,
          convenienceFee: b.convenienceFee || 0,
          _src: "api",
        }));
        const normalizedLocal = localList.map(b => ({
          _id: b._id,
          temple: b.temple,
          service: b.service,
          date: b.date,
          time: b.time,
          fullName: b.fullName || "",
          email: b.email || "",
          phone: b.phone || "",
          quantity: b.quantity || 1,
          amount: b.amount || 0,
          totalAmount: b.totalAmount || 0,
          convenienceFee: b.convenienceFee || 0,
          _src: "local",
        }));
        // Merge and de-duplicate by (temple+date+time+phone+service)
        const key = (x) => [x.temple,x.date,x.time,x.phone,x.service].join("|");
        const map = new Map();
        [...normalizedApi, ...normalizedLocal].forEach(item => {
          const k = key(item);
          if (!map.has(k) || map.get(k)._src === "local") {
            map.set(k, item);
          }
        });
        setBookings(Array.from(map.values()));
      } catch (e) {
        void e;
        try {
          const data = JSON.parse(localStorage.getItem("darshan_bookings") || "[]");
          setBookings(data);
        } catch { setBookings([]); }
      }
    })();
  }, []);

  const clearAll = () => {
    localStorage.removeItem("darshan_bookings");
    setBookings([]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-10">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">My Bookings</h1>
            <div className="badge badge-warning p-3">Loyalty Points: {points}</div>
          </div>
          {bookings.length === 0 ? (
            <div className="alert">
              <span>No bookings yet.</span>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Temple</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, idx) => {
                    const total = b.totalAmount ?? (b.amount || 0) * (b.quantity || 1) + (b.convenienceFee || 0);
                    return (
                      <tr key={idx}>
                        <td>{b._id || "-"}</td>
                        <td>{b.temple}</td>
                        <td>{b.service}</td>
                        <td>{b.date}</td>
                        <td>{b.time}</td>
                        <td>{b.quantity || 1}</td>
                        <td>₹{total}</td>
                        <td>{b.fullName}</td>
                        <td>{b.email}</td>
                        <td>{b.phone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button className="btn btn-outline" onClick={clearAll}>Clear All</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
