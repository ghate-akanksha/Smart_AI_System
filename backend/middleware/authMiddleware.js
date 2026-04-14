const jwt = require('jsonwebtoken');

// 1. Verify Authentication
exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains id, name, and role
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

// 2. Authorize Specific Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Forbidden: Access restricted to ${roles.join(' or ')}` 
      });
    }
    next();
  };
};