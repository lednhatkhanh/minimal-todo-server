import { gql } from "apollo-server-express";

export const authType = gql`
  type AuthResponse {
    token: String!
    issuedAt: DateTime!
    expiresIn: Int!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthResponse!
    register(email: String!, name: String!, password: String!): AuthResponse!
  }
`;
