import { AuthenticationError } from "apollo-server-express";

import { TaskModel } from "./task.model";
import { UserModel } from "../user";

export const taskResolver = {
  Task: {
    async owner(parent) {
      return await UserModel.findOne(parent.ownerId);
    },
  },
  Query: {
    async getMyTasks(_parent, { skip, limit }, { userId }) {
      if (!userId) {
        throw new AuthenticationError("You need to login first");
      }

      return await TaskModel.find({ ownerId: userId })
        .limit(limit)
        .skip(skip);
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
