import mongoose from "mongoose";

const flowStepSchema = new mongoose.Schema(
  {
    flowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flow",
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    delayAfterPrevious: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FlowStep = mongoose.model(
  "FlowStep",
  flowStepSchema
);

export default FlowStep;