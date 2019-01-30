import express from "express";
import helmet from "helmet";

export const createApp = () => {
  const app = express();

  app.use(helmet());

  return app;
};
