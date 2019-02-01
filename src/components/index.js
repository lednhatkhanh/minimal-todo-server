import { merge } from "lodash";

import { userResolver, userType } from "./user";
import { authResolver, authType, AuthDirective } from "./auth";
import { globalResolver, globalType } from "./global";

export const resolvers = merge(globalResolver, userResolver, authResolver);
export const typeDefs = [globalType, userType, authType];
export const schemaDirectives = {
  auth: AuthDirective,
};
