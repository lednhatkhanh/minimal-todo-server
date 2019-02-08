import { ApolloServer } from "apollo-server-express";

import { createApp } from "~/app/app";
import { appConfig } from "~/config";
import { connectToDatabase } from "~/app/database";
import { typeDefs, resolvers, schemaDirectives } from "~/components";
import { getUserLoader } from "~/components/user";
import { createStepLoader } from "~/components/step";

export async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx => ({
      req: ctx.req,
      res: ctx.res,
      userLoader: getUserLoader(),
      stepLoader: createStepLoader(),
    }),
    schemaDirectives,
  });

  const app = createApp();

  try {
    await connectToDatabase();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return;
  }

  server.applyMiddleware({ app });

  app.listen({ port: appConfig.APP.PORT }, () => {
    console.log(`Server ready at http://localhost:${appConfig.APP.PORT}${server.graphqlPath}`);
  });
}
