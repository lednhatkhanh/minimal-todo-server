import { AuthenticationError } from "apollo-server-express";

import { TaskModel } from "./task.model";
import { UserModel } from "../user";
import { StepModel } from "../step";

export const taskResolver = {
  Task: {
    async owner(parent) {
      return await UserModel.findOne(parent.ownerId);
    },
    async steps({ id }, { limit, skip }) {
      return await StepModel.find({ taskId: id })
        .limit(limit)
        .skip(skip);
    },
  },
  Query: {
    async getMyTasks(_parent, { skip, limit }, { userId }) {
      if (!userId) {
        throw new AuthenticationError("Unauthorized");
      }

      return await TaskModel.find({ ownerId: userId })
        .sort({
          updatedAt: -1,
        })
        .limit(limit)
        .skip(skip);
    },
    async getTask(_parent, { id }, { userId }) {
      if (!userId) {
        throw new AuthenticationError("Unauthorized");
      }

      return await TaskModel.findOne({ _id: id, ownerId: userId });
    },
  },
  Mutation: {
    async addTask(_parent, data, { userId }) {
      if (!userId) {
        throw new AuthenticationError("You need to login first");
      }

      return await new TaskModel({
        ...data,
        ownerId: userId,
      }).save();
    },
  },
};
