import { AuthenticationError } from "apollo-server-express";

import { TaskModel } from "./task.model";
import { StepModel } from "../step";

export const taskResolver = {
  Task: {
    owner(
      parent,
      _data,
      {
        loaders: { userLoader },
      },
    ) {
      return userLoader.load(parent.ownerId);
    },
    steps({ id }, { limit, skip }) {
      return StepModel.find({ taskId: id })
        .limit(limit)
        .skip(skip);
    },
  },
  Query: {
    getMyTasks(_parent, { skip, limit }, { userId }) {
      if (!userId) {
        throw new AuthenticationError("Unauthorized");
      }

      return TaskModel.find({ ownerId: userId })
        .sort({
          updatedAt: -1,
        })
        .limit(limit)
        .skip(skip);
    },
    getTask(_parent, { id }, { userId }) {
      if (!userId) {
        throw new AuthenticationError("Unauthorized");
      }

      return TaskModel.findOne({ _id: id, ownerId: userId });
    },
  },
  Mutation: {
    addTask(_parent, data, { userId }) {
      if (!userId) {
        throw new AuthenticationError("You need to login first");
      }

      return new TaskModel({
        ...data,
        ownerId: userId,
      }).save();
    },
  },
};
