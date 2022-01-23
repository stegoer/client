import gql from "graphql-tag";
import { DocumentNode } from "graphql";
import { pageInfoFragment } from "./base.fragments";

export const imageFragment: DocumentNode = gql`
  fragment ImageFragment on Image {
    id
    channel
    createdAt
    updatedAt
  }
`;

export const imageConnectionFragment: DocumentNode = gql`
  fragment ImageConnectionFragment on ImageConnection {
    totalCount
    edges {
      node {
        ...ImageFragment
      }
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
  ${imageFragment}
  ${pageInfoFragment}
`;
