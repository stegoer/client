import gql from "graphql-tag";
import {
  imageConnectionFragment,
  imageFragment,
} from "../fragments/image.fragments";
import { DocumentNode } from "graphql";
import { userErrorFragment } from "../fragments/base.fragments";

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
      images {
        ...ImageConnectionFragment
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${imageConnectionFragment}
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
