import express from "express";
import helmet from "helmet";

export function createApp() {
  const app = express();

  app.use(helmet());

  return app;
}
