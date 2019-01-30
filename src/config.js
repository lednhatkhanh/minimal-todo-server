import joi from "joi";

const appConfigSchema = joi.object({
  APP: joi
    .object({
      NODE_ENV: joi.string().required(),
      PORT: joi.number().required(),
      JWT_KEY: joi.string().required(),
      JWT_EXPIRES_IN: joi.number().required(),
      HASH_TIMES: joi.number().required(),
      // CLIENT_URL: joi.string().required(),
    })
    .required(),
  MONGO: joi
    .object({
      HOST: joi.string().required(),
      PORT: joi.number().required(),
      USERNAME: joi.string().required(),
      PASSWORD: joi.string().required(),
      AUTH_DATABASE: joi.string().required(),
    })
    .required(),
});

export const appConfig = {
  APP: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT, 10),
    HASH_TIMES: parseInt(process.env.HASH_TIMES, 10),
    JWT_KEY: process.env.JWT_KEY,
    JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN, 10),
  },
  MONGO: {
    HOST: process.env.MONGODB_HOST,
    PORT: parseInt(process.env.MONGODB_PORT, 10),
    USERNAME: process.env.MONGODB_USERNAME,
    PASSWORD: process.env.MONGODB_PASSWORD,
    AUTH_DATABASE: process.env.MONGODB_AUTH_DATABASE,
  },
};

const validationResult = joi.validate(appConfig, appConfigSchema);
if (validationResult.error) {
  throw new Error(validationResult.error.message);
}
