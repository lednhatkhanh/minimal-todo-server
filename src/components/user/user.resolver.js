export const userResolver = {
  Query: {
    me: async (_parent, _data, { userId }) => {
      if (userId) {
        return await UserModel.findById(userId);
      }

      return null;
    },
  },
};
