import mongoose from "mongoose";

const stepSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: { type: Boolean, default: false },
    taskId: { type: mongoose.Schema.Types.ObjectId, index: true },
  },
  { timestamps: true },
);

export const StepModel = mongoose.model("Step", stepSchema);
