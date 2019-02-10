import { ApolloServer } from "apollo-server-express";

import { createApp } from "~/app/app";
import { appConfig } from "~/config";
import { connectToDatabase } from "~/app/database";
import { typeDefs, resolvers, schemaDirectives } from "~/components";
import { getUserLoader } from "~/components/user";
import { getTaskLoader } from "~/components/task";

export async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx => ({
      req: ctx.req,
      res: ctx.res,
      loaders: {
        userLoader: getUserLoader(),
        taskLoader: getTaskLoader(),
      },
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
    // eslint-disable-next-line no-console
    console.log(`Server ready at http://localhost:${appConfig.APP.PORT}${server.graphqlPath}`);
  });
}
