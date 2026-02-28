import http from "http";

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(JSON.stringify(body));
    const req = http.request(
      {
        hostname: "localhost",
        port: 5000,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      },
      (res) => {
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
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const email = "testlogin@example.com";
  const password = "test123";
  const name = "CLI Tester";

  await new Promise((resolve) => {
    http.get("http://localhost:5000/", (res) => {
      let b = "";
      res.on("data", (d) => (b += d));
      res.on("end", () => {
        console.log("ROOT     =>", res.statusCode, b);
        resolve();
      });
    }).on("error", (e) => {
      console.error("ROOT error:", e.message);
      resolve();
    });
  });

  await new Promise((resolve) => {
    http.get("http://localhost:5000/api/users/ping", (res) => {
      let b = "";
      res.on("data", (d) => (b += d));
      res.on("end", () => {
        console.log("PING     =>", res.statusCode, b);
        resolve();
      });
    }).on("error", (e) => {
      console.error("PING error:", e.message);
      resolve();
    });
  });

  const reg = await post("/api/users/register", { name, email, password });
  console.log("REGISTER =>", reg.status, reg.json);
  const login = await post("/api/auth/login", { email, password });
  console.log("LOGIN    =>", login.status, login.json);
}

main().catch((e) => {
  console.error("HTTP error:", e.message);
  process.exit(1);
});
