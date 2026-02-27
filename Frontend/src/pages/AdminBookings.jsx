import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const load = () => {
    try {
      const data = JSON.parse(localStorage.getItem("darshan_bookings") || "[]");
      setBookings(Array.isArray(data) ? data : []);
    } catch { setBookings([]); }
  };

  useEffect(() => { setTimeout(load, 0); }, []);

  const remove = (idx) => {
    const list = bookings.filter((_, i) => i !== idx);
    setBookings(list);
    localStorage.setItem("darshan_bookings", JSON.stringify(list));
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
                    <td>{b.fullName}</td>
                    <td>₹{b.amount || "-"}</td>
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
