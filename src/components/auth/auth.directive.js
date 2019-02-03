import { defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { appConfig } from "~/config";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(...args) {
      const [, , ctx] = args;
      const authHeader = ctx.req.get("authorization");
      const tokenRegex = /^Bearer\s\S+/i;

      if (!authHeader || !tokenRegex.test(authHeader)) {
        return resolve.apply(this, args);
      }

      const token = authHeader.split(" ")[1];

      if (token) {
        let authPayload;

        try {
          authPayload = jwt.verify(token, appConfig.APP.JWT_KEY);
        } catch (error) {
          return resolve.apply(this, args);
        }

        if (typeof authPayload === "object" && authPayload.hasOwnProperty("userId")) {
          const { userId } = authPayload;
          ctx.userId = userId;
        }
      }

      return resolve.apply(this, args);
    };
  }
}
