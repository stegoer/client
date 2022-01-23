import gql from "graphql-tag";
import { DocumentNode } from "graphql";

export const imageConnectionFragment: DocumentNode = gql`
  fragment ImageConnectionFragment on ImageConnection {
    totalCount
    edges {
      node {
        id
        channel
        createdAt
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`;
