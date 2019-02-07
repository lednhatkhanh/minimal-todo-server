import { gql } from "apollo-server-express";

export const taskType = gql`
  type Task {
    id: ID!
    title: String!
    due: DateTime
    notification: DateTime
    owner: User!
    steps(skip: Int = 0, limit: Int = 5): [Step!]!
    color: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    addTask(title: String!, due: DateTime, notification: DateTime, color: String!): Task! @auth
  }

  extend type Query {
    getMyTasks(skip: Int = 0, limit: Int = 20): [Task!]! @auth
    getTask(id: ID!): Task @auth
  }
`;
