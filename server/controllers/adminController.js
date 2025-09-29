// controllers/adminController.js
import jwt from "jsonwebtoken";
import Activity from "../models/Activity.js";

export const adminLogin = (req, res) => {
    const { email, password } = req.body;
    // Compare with env
    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        // Generate token with role "admin"
        const token = jwt.sign(
            { id: "admin", role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.json({
            success: true,
            message: "Admin login successful",
            token,
            user: { id: "admin", email, role: "admin" }
        });
    } else {
        return res
            .status(401)
            .json({ success: false, message: "Invalid admin credentials" });
    }
};

// Get all activities for admin
export const getAllActivity = async (req, res) => {
    try {
        const activities = await Activity.find().populate("studentId", "name email rollNo");
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Approve activity
export const approveActivity = async (req, res) => {
  try {

    const verifierId = req.user.id === "admin" ? "admin" : req.user.id;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { status: "approved", verifiedBy: verifierId },
      { new: true }
    );
    if (!activity) {
      return res.status(404).json({ success: false, message: "Activity not found" });
    }
    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject activity
export const rejectActivity = async (req, res) => {
  try {
    const verifierId = req.user.id === "admin" ? "admin" : req.user.id;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", verifiedBy: verifierId },
      { new: true }
    );
    if (!activity) {
      return res.status(404).json({ success: false, message: "Activity not found" });
    }
    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};