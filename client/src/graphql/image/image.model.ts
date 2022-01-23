import gql from "graphql-tag";
import { imageConnectionFragment } from "../fragments/image.fragments";
import { DocumentNode } from "graphql";

export const images: DocumentNode = gql`
    query Images($first: Int) {
        images(first: $first) {
            ...ImageConnectionFragment
        }
        ${imageConnectionFragment}
    }
`;

export const createImage: DocumentNode = gql`
  mutation CreateImage($channel: Channel!, $file: Upload!) {
    createImage(input: { channel: $channel, file: $file }) {
      id
      channel
      createdAt
    }
  }
`;
