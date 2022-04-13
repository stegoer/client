import type { DocType } from "@features/docs/docs.types";

export const CLIENT_DEVELOPMENT_DOCS_URL = `https://github.com/stegoer/client/blob/master/README.md`;
export const SERVER_DEVELOPMENT_DOCS_URL = `https://github.com/stegoer/server/blob/main/README.md`;
export const DOCUMENTATION_DEVELOPMENT_DOCS_URL = `https://github.com/stegoer/documentation/blob/main/README.md`;

export const DEVELOPMENT_DOCUMENTATION_URLS: Record<DocType, string> = {
  client: CLIENT_DEVELOPMENT_DOCS_URL,
  server: SERVER_DEVELOPMENT_DOCS_URL,
  documentation: DOCUMENTATION_DEVELOPMENT_DOCS_URL
}

export const CLIENT_REFERENCE_URL = `https://stegoer.github.io/client`;
export const SERVER_REFERENCE_URL = `https://pkg.go.dev/github.com/stegoer/server`;

export const REFERENCE_URLS: Record<DocType, string | undefined> = {
  client: CLIENT_REFERENCE_URL,
  server: SERVER_REFERENCE_URL,
  documentation: undefined,
}

export const CLIENT_SOURCE_URL = `https://github.com/stegoer/client`;
export const SERVER_SOURCE_URL = `https://github.com/stegoer/server`;
export const DOCUMENTATION_SOURCE_URL = `https://github.com/stegoer/documentation`;

export const SOURCE_URLS: Record<DocType, string> = {
  client: CLIENT_SOURCE_URL,
  server: SERVER_SOURCE_URL,
  documentation: DOCUMENTATION_SOURCE_URL
}
