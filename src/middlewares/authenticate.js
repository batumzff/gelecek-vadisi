const { verifyToken } = require("../controllers/token");

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.body?.token ?? req?.query?.token ?? req.headers?.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
