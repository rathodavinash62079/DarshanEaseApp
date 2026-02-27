import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token" });
  }
  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), "secret123");
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
