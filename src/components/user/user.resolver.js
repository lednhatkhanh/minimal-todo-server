import { UserModel } from "./user.model";

export const userResolver = {
  Query: {
    async me(_parent, _data, { userId }) {
      if (userId) {
        return await UserModel.findById(userId);
      }

      return null;
    },
  },
};
