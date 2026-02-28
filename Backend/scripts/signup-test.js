import http from "http";
import https from "https";
import { randomBytes } from "crypto";

function base() {
  const raw = process.env.API_BASE || "http://localhost:5000";
  const u = new URL(raw);
  return {
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port ? Number(u.port) : u.protocol === "https:" ? 443 : 80,
    prefix: u.pathname && u.pathname !== "/" ? u.pathname.replace(/\/+$/, "") : "",
  };
}

function get(path) {
  const b = base();
  const client = b.protocol === "https:" ? https : http;
  return new Promise((resolve) => {
    client.get(`${b.protocol}//${b.hostname}:${b.port}${b.prefix}${path}`, (res) => {
      let buf = "";
      res.on("data", (d) => (buf += d));
      res.on("end", () => resolve({ status: res.statusCode, body: buf }));
    }).on("error", (e) => resolve({ status: 0, body: e.message }));
  });
}

function post(path, body) {
  const b = base();
  const data = Buffer.from(JSON.stringify(body));
  const options = {
    protocol: b.protocol,
    hostname: b.hostname,
    port: b.port,
    path: `${b.prefix}${path}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  return new Promise((resolve, reject) => {
    const client = b.protocol === "https:" ? https : http;
    const req = client.request(options, (res) => {
      let buf = "";
      res.on("data", (chunk) => (buf += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(buf || "{}");
          resolve({ status: res.statusCode, json });
        } catch {
          resolve({ status: res.statusCode, json: buf });
        }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const suffix = randomBytes(4).toString("hex");
  const email = `signup_${suffix}@example.com`;
  const password = "Test1234";
  const name = "Signup Test";

  const pingRoot = await get("/");
  console.log("ROOT   =>", pingRoot.status);
  const pingUsers = await get("/api/users/ping");
  console.log("PING   =>", pingUsers.status, pingUsers.body);
  if (pingRoot.status === 0) {
    console.error("Server not reachable. Ensure 'npm start' is running and port open.");
    process.exit(1);
  }

  const reg = await post("/api/users/signup", { name, email, password });
  console.log("SIGNUP =>", reg.status, reg.json);

  const login = await post("/api/users/signin", { email, password });
  console.log("SIGNIN =>", login.status, login.json);

  const reg2 = await post("/api/users/register", { name, email: `r_${email}`, password });
  console.log("REGISTER =>", reg2.status, reg2.json);

  if (![200, 201].includes(reg.status)) {
    console.error("Signup failed");
    process.exit(1);
  }
  if (login.status !== 200) {
    console.error("Signin failed");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("HTTP error:", e.message);
  process.exit(1);
});
