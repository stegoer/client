import type { DocType } from "@features/docs/docs.types";

export const CLIENT_DOCS_URL = `https://stegoer.github.io/client`;
export const SERVER_DOCS_URL = `https://pkg.go.dev/github.com/stegoer/server`;

export const DOCUMENTATION_URLS: Record<DocType, string> = {
  client: CLIENT_DOCS_URL,
  server: SERVER_DOCS_URL,
}

export const CLIENT_SOURCE_URL = `https://github.com/stegoer/client`;
export const SERVER_SOURCE_URL = `https://github.com/stegoer/server`;

export const SOURCE_URLS: Record<DocType, string> = {
  client: CLIENT_SOURCE_URL,
  server: SERVER_SOURCE_URL
}
