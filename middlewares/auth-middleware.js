const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const Alumni = require("../models/alumni-model");
const Student = require("../models/student-model");

const authMiddleware = (allowedRoles) => async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    // If no token is provided, return a 401 Unauthorized HTTP response
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided." });
  }

  // Assuming token is in the format "Bearer <jwtToken>", strip the "Bearer" prefix
  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    let user;
    switch (decoded.role.toLowerCase()) {
      case "admin":
        user = await User.findOne({ email: decoded.email }).select({ password: 0 });
        break;
      case "student":
        user = await Student.findOne({ email: decoded.email }).select({ password: 0 });
        break;
      case "alumni":
        user = await Alumni.findOne({ email: decoded.email }).select({ password: 0 });
        break;
      default:
        return res.status(400).json({ message: "Invalid role." });
    }

    if (!user) {
      // If the user is not found, return a 401 Unauthorized HTTP response
      return res.status(401).json({ message: "Unauthorized: User not found." });
    }

    // Check if the user's role matches one of the allowed roles
    if (!allowedRoles.includes(user.role.toLowerCase())) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not have permission." });
    }

    // Attach user data to the request object
    req.token = token;
    req.user = user;
    req.userID = user._id;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized HTTP response
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token.",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
