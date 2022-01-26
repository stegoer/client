import gql from "graphql-tag";
import { DocumentNode } from "graphql";

export const imageFragment: DocumentNode = gql`
  fragment ImageFragment on Image {
    id
    channel
    createdAt
    updatedAt
  }
`;
