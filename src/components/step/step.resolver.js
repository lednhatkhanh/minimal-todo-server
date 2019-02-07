import mongoose from "mongoose";
import { AuthenticationError } from "apollo-server-express";

import { TaskModel } from "../task";
import { StepModel } from "./step.model";

export const stepResolver = {
  Step: {
    async task(parent) {
      return await TaskModel.findById(parent.taskId);
    },
  },
  Mutation: {
    async addStep(_parent, { taskId, title, completed }, context) {
      if (!context.userId) {
        throw new AuthenticationError("unauthorized");
      }

      const isOwner = await TaskModel.findOne({ id: taskId, ownerId: context.userId });
      if (!isOwner) {
        throw new AuthenticationError("unauthorized");
      }

      const step = await new StepModel({ taskId, title, completed }).save();

      return step;
    },
    async toggleStep(_parent, { id }, context) {
      if (!context.userId) {
        throw new AuthenticationError("unauthorized");
      }

      // Aggregation!!!!
      const tasks = await TaskModel.aggregate([
        {
          $lookup: { from: "steps", localField: "_id", foreignField: "taskId", as: "steps" },
        },
        { $unwind: "$steps" },
        {
          $match: {
            ownerId: mongoose.Types.ObjectId(context.userId),
            "steps._id": mongoose.Types.ObjectId(id),
          },
        },
      ]).exec();

      if (!tasks.length) {
        throw new Error("Unauthorized");
      }

      return await StepModel.findByIdAndUpdate(tasks[0].steps._id, {
        completed: !tasks[0].steps.completed,
      });
    },
  },
};
