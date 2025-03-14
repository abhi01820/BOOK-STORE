const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  const token = authHeader.split(" ")[1]; // Fix the variable name

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Use env variable
    if (err) {
      return res.status(403).json({ message: "Token expired. Please sign in again" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
