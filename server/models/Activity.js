import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["conference", "workshop", "certification", "competition", "internship", "volunteering", "club", "sports"],
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    fileUrl: String, // certificate/document upload
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    verifiedBy: {
        type: mongoose.Schema.Types.Mixed
    }, // faculty who verified
    points: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);
