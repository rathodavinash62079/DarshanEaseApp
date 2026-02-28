import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token" });
  }
  try {
    const raw = String(token || "");
    const cleaned = raw.replace(/^Bearer\s+/i, "");
    const secret = process.env.JWT_SECRET || "devsecret";
    const verified = jwt.verify(cleaned, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
