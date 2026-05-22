import mongoose from "mongoose";

const flowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Flow = mongoose.model("Flow", flowSchema);

export default Flow;