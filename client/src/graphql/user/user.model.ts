import gql from "graphql-tag";
import { imageFragment } from "../fragments/image.fragments";
import { DocumentNode } from "graphql";
import { userErrorFragment } from "../fragments/base.fragments";
import { authFragment, userFragment } from "../fragments/user.fragments";

export const overview: DocumentNode = gql`
  query Overview {
    overview {
      user {
        ...UserFragment
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${userFragment}
  ${userErrorFragment}
`;

export const createUser: DocumentNode = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(input: { username: $username, password: $password }) {
      user {
        ...UserFragment
      }
      auth {
        ...AuthFragment
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${imageFragment}
  ${authFragment}
  ${userErrorFragment}
`;

export const refreshToken: DocumentNode = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(input: { token: $token }) {
      user {
        ...UserFragment
      }
      auth {
        ...AuthFragment
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${imageFragment}
  ${authFragment}
  ${userErrorFragment}
`;

export const updateUser: DocumentNode = gql`
  mutation UpdateUser($name: String, $password: String) {
    updateUser(input: { name: $name, password: $password }) {
      user {
        ...UserFragment
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${imageFragment}
  ${userErrorFragment}
`;
