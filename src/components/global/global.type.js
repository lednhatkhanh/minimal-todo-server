import { gql } from "apollo-server-express";

export const globalType = gql`
  directive @auth on FIELD_DEFINITION
  scalar DateTime
`;
