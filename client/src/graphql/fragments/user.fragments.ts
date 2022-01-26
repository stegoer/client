import gql from "graphql-tag";
import { DocumentNode } from "graphql";

export const userFragment: DocumentNode = gql`
  fragment UserFragment on User {
    id
    name
    createdAt
    updatedAt
  }
`;

export const authFragment: DocumentNode = gql`
  fragment AuthFragment on Auth {
    token
    expires
  }
`;
