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
      const isOwner = (await TaskModel.aggregate([
        {
          $lookup: { from: "steps", localField: "_id", foreignField: "taskId", as: "steps" },
        },
        {
          $match: {
            ownerId: mongoose.Types.ObjectId(context.userId),
            steps: { $elemMatch: { _id: mongoose.Types.ObjectId(id) } },
          },
        },
      ]).exec()).length;

      if (!isOwner) {
        throw new Error("Unauthorized");
      }

      const step = await StepModel.findById(id);
      step.completed = !step.completed;
      await step.save();

      return step;
    },
  },
};
