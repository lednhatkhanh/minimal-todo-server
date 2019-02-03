import { gql } from "apollo-server-express";

export const userType = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    me: User @auth
  }

  type Mutation {
    updateMe(name: String!): User!
  }
`;
