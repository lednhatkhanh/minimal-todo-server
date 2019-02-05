import { merge } from "lodash";

import { userResolver, userType } from "./user";
import { authResolver, authType, AuthDirective } from "./auth";
import { globalResolver, globalType } from "./global";
import { taskResolver, taskType } from "./task";
import { stepType, stepResolver } from "./step";

export const resolvers = merge(
  globalResolver,
  userResolver,
  authResolver,
  taskResolver,
  stepResolver,
);
export const typeDefs = [globalType, userType, authType, taskType, stepType];
export const schemaDirectives = {
  auth: AuthDirective,
};
