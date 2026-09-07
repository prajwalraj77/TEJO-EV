
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decode.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }
    return res.status(403).json({ message: "Invalid token." });
  }
};


// {
//   "success": true,
//   "message": "User logged in",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOWRkNWMyMGYwMWE2MGM2NDZlMzkxYiIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc4ODcyODkyMCwiZXhwIjoxNzg4NzMyNTIwfQ.he68Dz-s4uhtEv512cp7b4rg1Fc3vEC21lG8OAvW-LU"
// }