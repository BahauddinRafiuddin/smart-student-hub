import Activity from "../models/Activity.js";

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const { title, type, description, date, fileUrl } = req.body;
    if (!title || !type || !description || !date) {
      res.status(403).json({ success: false, message: "All Details Are required" })
    }
    const activity = await Activity.create({
      studentId: req.user.id,
      title,
      type,
      description,
      date,
      fileUrl
    });
    res.status(201).json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all activities for the logged-in student
export const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ studentId: req.user.id });
    res.json({ success: true, activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single activity by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    // Only owner or faculty can view
    if (
      activity.studentId.toString() !== req.user.id &&
      req.user.role !== "faculty"
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update an activity (only owner)
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    if (activity.studentId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    Object.assign(activity, req.body);
    await activity.save();
    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an activity (only owner)
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    if (activity.studentId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    await activity.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};