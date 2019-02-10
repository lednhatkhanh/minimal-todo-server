import mongoose from "mongoose";
import DataLoader from "dataloader";

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
    ownerId: { type: mongoose.Schema.Types.ObjectId, index: true },
  },
  { timestamps: true },
);

const TaskModel = mongoose.model("task", taskSchema);

function getTaskLoader() {
  return new DataLoader(taskIds =>
    TaskModel.find({ _id: { $in: taskIds } })
      .exec()
      .then(tasks => taskIds.map(taskId => tasks.find(task => task.id === taskId.toString()))),
  );
}

export { TaskModel, getTaskLoader };
