import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {

    // ✅ Accept both formats (important)
    const token = req.headers.token || req.headers.authorization;

    console.log("HEADERS:", req.headers);
    console.log("TOKEN RECEIVED:", token);

    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login again" });
    }

    // ✅ Remove "Bearer " if exists
    const finalToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(finalToken, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    // ✅ Check admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized Login again" });
    }

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;