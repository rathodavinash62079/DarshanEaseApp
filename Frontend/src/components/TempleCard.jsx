import React, { useMemo, useState } from "react";
import { api } from "../lib/api";

const TempleCard = ({name,image}) => {

const modalId = useMemo(() => `booking_${name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`, [name]);
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [service, setService] = useState("");
const [step, setStep] = useState("form");
const [paymentMethod, setPaymentMethod] = useState("");

const basePrice = (type) => {
  if (type === "Special Puja") return 500;
  if (type === "Accommodation") return 300;
  return 100;
};
const loyalty = (() => {
  try { return JSON.parse(localStorage.getItem("darshan_bookings") || "[]").length * 10; } catch { return 0; }
})();
const discount = loyalty >= 50 ? 0.1 : 0;
const amount = Math.max(0, Math.round(basePrice(service || "Darshan") * (1 - discount)));
const [error, setError] = useState("");

const openBooking = () => {
  document.getElementById(modalId)?.showModal();
};

const confirmBooking = (e) => {
  e.preventDefault();
  setError("");
  if (!fullName || !email || !phone || !date || !time || !service) {
    setError("Please complete all fields");
    return;
  }
  const phoneDigits = /^\d{10}$/.test(phone);
  if (!phoneDigits) {
    setError("Phone must be 10 digits");
    return;
  }
  setStep("payment");
};

const doPayment = async (e) => {
  e.preventDefault();
  if (!paymentMethod) {
    setError("Please select a payment method");
    return;
  }
  const booking = {
    temple: name,
    fullName,
    email,
    phone,
    date,
    time,
    service,
    amount,
    paymentMethod,
    createdAt: new Date().toISOString(),
  };
  try {
    const existing = JSON.parse(localStorage.getItem("darshan_bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("darshan_bookings", JSON.stringify(existing));
  } catch (e) { void e; }
  try {
    await api.post("/api/book", booking);
  } catch (e) { void e; }
  alert(`Payment confirmed. Booking for ${name} on ${date} at ${time}`);
  document.getElementById(modalId)?.close();
  setFullName(""); setEmail(""); setPhone(""); setDate(""); setTime(""); setService(""); setPaymentMethod(""); setStep("form");
};

return (

<div className="card bg-white shadow-xl min-w-[160px] hover:scale-105 duration-200">

<figure>

<img src={image} className="h-28 w-full object-cover object-center"/>

</figure>

<div className="card-body p-2 text-center flex flex-col">

<h2 className="font-semibold">

{name}

</h2>

<button
className="btn btn-success btn-sm mt-auto hover:bg-pink-500 hover:text-white"
onClick={openBooking}
>

Book Now

</button>

{/* Booking Modal */}
<dialog id={modalId} className="modal modal-middle">
  <div className="modal-box bg-white text-black">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
    </form>
    <h3 className="font-bold text-lg mb-4">Book Darshan</h3>

    {step === "form" && (
    <div className="space-y-3">
      <div>
        <label className="label">Temple</label>
        <input readOnly value={name} className="input input-bordered w-full bg-gray-100 text-black"/>
      </div>
      <div>
        <label className="label">Your Name</label>
        <input value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Enter your name" className="input input-bordered w-full bg-white text-black"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" className="input input-bordered w-full bg-white text-black"/>
        </div>
        <div>
          <label className="label">Phone</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit phone" className="input input-bordered w-full bg-white text-black"/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">Date</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="input input-bordered w-full bg-white text-black"/>
        </div>
        <div>
          <label className="label">Time Slot</label>
          <select value={time} onChange={(e)=>setTime(e.target.value)} className="select select-bordered w-full bg-white text-black">
            <option value="" disabled>Select a slot</option>
            <option>06:00 AM - 07:00 AM</option>
            <option>07:00 AM - 08:00 AM</option>
            <option>10:00 AM - 11:00 AM</option>
            <option>04:00 PM - 05:00 PM</option>
            <option>06:00 PM - 07:00 PM</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label">Service Type</label>
        <select value={service} onChange={(e)=>setService(e.target.value)} className="select select-bordered w-full bg-white text-black">
          <option value="" disabled>Select a service</option>
          <option>Darshan</option>
          <option>Special Puja</option>
          <option>Accommodation</option>
        </select>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="badge badge-ghost p-3">Loyalty: {loyalty} pts {discount ? "(10% off)" : ""}</div>
        <div className="badge badge-primary p-3">Amount: ₹{amount}</div>
      </div>
      <button onClick={confirmBooking} className="btn btn-primary w-full mt-2">Proceed to Payment</button>
    </div>
    )}
    {step === "payment" && (
      <form onSubmit={doPayment} className="space-y-3">
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-title">Payable Amount</div>
            <div className="stat-value">₹{amount}</div>
            {discount ? <div className="stat-desc">Includes 10% loyalty discount</div> : null}
          </div>
        </div>
        <div>
          <label className="label">Payment Method</label>
          <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} className="select select-bordered w-full bg-white text-black">
            <option value="" disabled>Select a method</option>
            <option>Card</option>
            <option>UPI</option>
            <option>NetBanking</option>
          </select>
        </div>
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        <button type="submit" className="btn btn-success w-full mt-2">Pay Now</button>
        <button type="button" onClick={()=>setStep("form")} className="btn btn-ghost w-full">Back</button>
      </form>
    )}
  </div>
</dialog>

</div>

</div>

);

};

export default TempleCard;
