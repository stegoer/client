import { DocumentNode } from "graphql";
import gql from "graphql-tag";

export const userErrorFragment: DocumentNode = gql`
  fragment UserErrorFragment on UserError {
    message
    code
    path
  }
`;

export const pageInfoFragment: DocumentNode = gql`
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    endCursor
  }
`;
