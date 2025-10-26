import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    duration_in_year: {
      type: Number,
      required: true,
    },
    total_semester: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Courses", courseSchema);
