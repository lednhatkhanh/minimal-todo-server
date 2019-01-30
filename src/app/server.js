import { ApolloServer, gql } from "apollo-server-express";

import { createApp } from "~/app/app";
import { appConfig } from "~/config";
import { connectToDatabase } from "~/app/database";

export const startServer = () => {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = { Query: { hello: () => "Hello World" } };

  const server = new ApolloServer({ typeDefs, resolvers });
  const app = createApp();
  connectToDatabase();

  server.applyMiddleware({ app });

  app.listen({ port: appConfig.APP.PORT }, () => {
    console.log(`Server ready at http://localhost:${appConfig.APP.PORT}${server.graphqlPath}`);
  });
};
