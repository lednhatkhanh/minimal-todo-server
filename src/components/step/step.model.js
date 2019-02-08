import mongoose from "mongoose";
import DataLoader from "dataloader";

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

export function createStepLoader() {
  return new DataLoader(stepIds => StepModel.find({ _id: { $in: stepIds } }).exec());
}
export const StepModel = mongoose.model("Step", stepSchema);
