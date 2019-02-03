import mongoose from "mongoose";
import { appConfig } from "~/config";

export function connectToDatabase() {
  return mongoose.connect(
    `mongodb://${appConfig.MONGO.USERNAME}:${appConfig.MONGO.PASSWORD}@${appConfig.MONGO.HOST}:${
      appConfig.MONGO.PORT
    }/${appConfig.MONGO.AUTH_DATABASE}`,
    { useNewUrlParser: true, useCreateIndex: true },
  );
}
