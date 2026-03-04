import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const taxModel = mongoose.models.Tax || mongoose.model("Tax", taxSchema);

export default taxModel;
