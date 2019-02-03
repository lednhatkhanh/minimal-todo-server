import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    due: {
      type: Date,
    },
    notification: { type: Date },
    ownerId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model("task", taskSchema);
