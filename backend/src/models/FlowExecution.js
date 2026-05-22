import mongoose from "mongoose";

const flowExecutionSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    flowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flow",
      required: true,
    },

    currentStep: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: [
        "waiting",
        "running",
        "paused",
        "failed",
        "finished",
      ],
      default: "waiting",
    },
  },
  {
    timestamps: true,
  }
);

const FlowExecution = mongoose.model(
  "FlowExecution",
  flowExecutionSchema
);

export default FlowExecution;