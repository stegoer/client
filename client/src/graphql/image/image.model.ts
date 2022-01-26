import gql from "graphql-tag";
import { imageFragment } from "../fragments/image.fragments";
import { DocumentNode } from "graphql";
import {
  pageInfoFragment,
  userErrorFragment,
} from "../fragments/base.fragments";

export const images: DocumentNode = gql`
  query Images(
    $after: Cursor
    $first: Int
    $before: Cursor
    $last: Int
    $where: ImageWhereInput
    $orderBy: ImageOrder
  ) {
    images(
      after: $after
      first: $first
      before: $before
      last: $last
      where: $where
      orderBy: $orderBy
    ) {
      totalCount
      edges {
        node {
          ...ImageFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${imageFragment}
  ${pageInfoFragment}
  ${userErrorFragment}
`;

export const createImage: DocumentNode = gql`
  mutation CreateImage($channel: Channel!, $file: Upload!) {
    createImage(input: { channel: $channel, file: $file }) {
      image {
        ...ImageFragment
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${imageFragment}
  ${userErrorFragment}
`;
