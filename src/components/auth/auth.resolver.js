import { ValidationError } from "apollo-server-express";

import { UserModel } from "~/components/user";
import { createAuthResponse } from "./auth.helper";

export const authResolver = {
  Mutation: {
    async login(_parent, { email, password }) {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new ValidationError("Wrong email or password");
      }

      const passwordValid = await user.checkPassword(password);
      if (!passwordValid) {
        throw new ValidationError("Wrong email or password");
      }

      return createAuthResponse(user.id);
    },
    async register(_parent, { email, password, name }) {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new ValidationError("User with the same email exists.");
      }

      const user = await new UserModel({ email, name, password }).save();

      return createAuthResponse(user.id);
    },
  },
};
