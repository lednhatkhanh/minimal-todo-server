import { gql } from "apollo-server-express";

export const userType = gql`
  type User {
    email: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    me: User
  }

  type Mutation {
    updateMe(name: String!): User!
  }
`;
