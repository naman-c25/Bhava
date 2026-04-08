import jwt from "jsonwebtoken";

const signAdminToken = (role = "admin") => {
  const payload = { id: "admin", role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "bhava@gmail.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bhava@123";

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Provide email and password" });

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    const token = signAdminToken("admin");
    res.json({
      success: true,
      token,
      user: { email: ADMIN_EMAIL, name: "Admin" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
