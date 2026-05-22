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

    totalContacts: {
      type: Number,
      default: 0,
    },

    processedContacts: {
      type: Number,
      default: 0,
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