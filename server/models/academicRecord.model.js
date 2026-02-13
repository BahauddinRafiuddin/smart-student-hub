import mongoose from "mongoose";

//enum
const academicStatus = [
  "active",
  "suspended",
  "Withdrawn",
  "graduated",
  "leave of absence",
];

const academicRecordSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    GPA: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    percentage: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    credits_earned: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    status: {
      type: String,
      enum: academicStatus,
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AcademicRecords",academicRecordSchema);
