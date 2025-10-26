import mongoose from "mongoose";

const addresSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      default: "",
    },
    apartment_no: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pin_code: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Address",addresSchema);