import { gql } from "apollo-server-express";

export const stepType = gql`
  type Step {
    id: ID!
    title: String!
    completed: Boolean!
    task: Task!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    addStep(taskId: ID!, title: String!, completed: Boolean!): Step! @auth
    toggleStep(id: ID!): Step! @auth
  }
`;
