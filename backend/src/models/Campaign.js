import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    minDelay: {
      type: Number,
      required: true,
    },

    maxDelay: {
      type: Number,
      required: true,
    },

    status: {
      type: String,

      enum: [
        "pending",
        "running",
        "finished",
      ],

      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

const Campaign = mongoose.model(
  "Campaign",
  campaignSchema
);

export default Campaign;