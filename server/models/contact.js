import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contacts", contactSchema);
