import jwt from "jsonwebtoken";
import moment from "moment";

import { appConfig } from "~/config";

export function createAuthResponse(userId) {
  const payload = {
    userId,
  };

  const expiresIn = appConfig.APP.JWT_EXPIRES_IN;
  const token = jwt.sign(payload, appConfig.APP.JWT_KEY, {
    expiresIn,
  });

  return { token, expiresIn, issuedAt: moment().toDate() };
}
