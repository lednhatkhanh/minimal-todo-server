import { merge } from "lodash";

import { userResolver, userType } from "./user";
import { authResolver, authType, AuthDirective } from "./auth";
import { globalResolver, globalType } from "./global";
import { taskResolver, taskType } from "./task";

export const resolvers = merge(globalResolver, userResolver, authResolver, taskResolver);
export const typeDefs = [globalType, userType, authType, taskType];
export const schemaDirectives = {
  auth: AuthDirective,
};
