import React, { useState } from "react";
import { api } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setOk("");
    if (!email || !password) { setError("Please enter email and password"); return; }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { setError("Invalid email address"); return; }
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      if (data?.token) localStorage.setItem("darshan_token", data.token);
      if (data?.user) localStorage.setItem("darshan_user", JSON.stringify(data.user));
      setOk("Login successful");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {ok && <div style={{ color: "green", marginBottom: 8 }}>{ok}</div>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={onSubmit}>Login</button>
    </div>
  );
}
