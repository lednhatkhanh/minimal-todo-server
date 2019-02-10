import { UserModel } from "./user.model";

export const userResolver = {
  Query: {
    me(_parent, _data, { userId }) {
      if (userId) {
        return UserModel.findById(userId);
      }

      return null;
    },
  },
};
