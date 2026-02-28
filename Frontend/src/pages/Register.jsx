import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setOk("");
    if (!name || !email || !password) { setError("All fields are required"); return; }
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      if (data?.token) localStorage.setItem("darshan_token", data.token);
      if (data?.user) localStorage.setItem("darshan_user", JSON.stringify(data.user));
      setOk("Registration successful");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Register</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {ok && <div style={{ color: "green", marginBottom: 8 }}>{ok}</div>}
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={onSubmit}>Register</button>
    </div>
  );
}
