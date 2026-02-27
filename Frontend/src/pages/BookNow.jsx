import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../lib/api";

const BookNow = () => {
  const [params] = useSearchParams();
  const temple = params.get("temple") || "";
  const slotId = params.get("slotId") || "";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState("form");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [fee] = useState(45);
  const [slotPrice, setSlotPrice] = useState(null);

  const basePrice = (type) => {
    if (type === "Special Puja") return 500;
    if (type === "Accommodation") return 300;
    return 100; // Darshan
  };
  const loyalty = (() => {
    try { return JSON.parse(localStorage.getItem("darshan_bookings") || "[]").length * 10; } catch { return 0; }
  })();
  const discount = loyalty >= 50 ? 0.1 : 0; // 10% off if 50+ points
  const unit = Math.max(0, Math.round(basePrice(service || "Darshan") * (1 - discount)));
  const effectiveUnit = slotPrice != null ? slotPrice : unit;
  const amount = effectiveUnit * Math.max(1, Number(quantity) || 1) + fee;

  useEffect(() => {
    (async () => {
      if (!slotId) return;
      try {
        const { data } = await api.get(`/api/slots/${slotId}`);
        if (data?._id) {
          setSlotPrice(Number(data.price) || 0);
          setService("Darshan");
          setDate(data.date);
          setTime(`${data.startTime} - ${data.endTime}`);
        }
      } catch (e) { void e; }
    })();
  }, [slotId]);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!temple || !fullName || !email || !phone || !date || !time || !service) {
      setError("Please complete all fields");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone must be 10 digits");
      return;
    }
    setStep("payment");
  };

  const onPay = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    const booking = {
      temple,
      fullName,
      email,
      phone,
      date,
      time,
      service,
      slotId: slotId || undefined,
      amount: effectiveUnit,
      quantity: Math.max(1, Number(quantity) || 1),
      convenienceFee: fee,
      totalAmount: amount,
      paymentMethod,
      createdAt: new Date().toISOString()
    };
    try {
      const existing = JSON.parse(localStorage.getItem("darshan_bookings") || "[]");
      existing.push(booking);
      localStorage.setItem("darshan_bookings", JSON.stringify(existing));
  } catch (e) { void e; }
    try {
      await api.post("/api/book", booking);
  } catch (e) { void e; }
    setSuccess("Payment confirmed. Booking created successfully.");
    setFullName(""); setEmail(""); setPhone(""); setDate(""); setTime(""); setService("");
    setPaymentMethod(""); setStep("form");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-10">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Book Darshan</h1>
          {error && <div className="alert alert-error mb-3"><span>{error}</span></div>}
          {success && <div className="alert alert-success mb-3"><span>{success}</span></div>}
          {step === "form" && (
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="label">Temple</label>
              <input readOnly value={temple} className="input input-bordered w-full bg-gray-100 text-black" />
            </div>
            <div>
              <label className="label">Your Name</label>
              <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="input input-bordered w-full bg-white text-black" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="label">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input input-bordered w-full bg-white text-black" />
              </div>
              <div>
                <label className="label">Phone</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,'').slice(0,10))} className="input input-bordered w-full bg-white text-black" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="label">Date</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} disabled={!!slotId} className="input input-bordered w-full bg-white text-black" />
              </div>
              <div>
                <label className="label">Time Slot</label>
                <select value={time} onChange={(e)=>setTime(e.target.value)} disabled={!!slotId} className="select select-bordered w-full bg-white text-black">
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
              <select value={service} onChange={(e)=>setService(e.target.value)} disabled={!!slotId} className="select select-bordered w-full bg-white text-black">
                <option value="" disabled>Select a service</option>
                <option>Darshan</option>
                <option>Special Puja</option>
                <option>Accommodation</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div className="form-control">
                <label className="label">Quantity</label>
                <div className="join">
                  <button type="button" className="btn join-item" onClick={()=>setQuantity(q=>Math.max(1, q-1))}>-</button>
                  <input className="input input-bordered join-item w-16 text-center"
                         value={quantity} onChange={(e)=>setQuantity(Math.max(1, parseInt(e.target.value||'1',10) || 1))}/>
                  <button type="button" className="btn join-item" onClick={()=>setQuantity(q=>q+1)}>+</button>
                </div>
              </div>
              <div className="badge badge-ghost p-3 self-end">Loyalty: {loyalty} pts {discount ? "(10% off)" : ""}</div>
              <div className="badge badge-primary p-3 self-end">Unit: ₹{effectiveUnit}</div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2">Proceed to Payment</button>
          </form>
          )}
          {step === "payment" && (
            <form onSubmit={onPay} className="space-y-3">
              <div className="stats shadow w-full">
                <div className="stat">
                  <div className="stat-title">Summary</div>
                  <div className="stat-value">₹{amount}</div>
                  <div className="stat-desc">Unit ₹{effectiveUnit} × {quantity} + Fee ₹{fee}</div>
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
              <button type="submit" className="btn btn-success w-full mt-2">Pay Now</button>
              <button type="button" onClick={()=>setStep("form")} className="btn btn-ghost w-full">Back</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookNow;
