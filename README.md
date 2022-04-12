# client

[![Production deployment](https://api.netlify.com/api/v1/badges/a154da12-c432-4157-b1b2-52876346d0db/deploy-status)](https://stegoer.netlify.app/)
[![Continuous Integration](https://github.com/stegoer/client/actions/workflows/ci.yml/badge.svg)](https://github.com/stegoer/client/actions/workflows/ci.yml)
[![Docs](https://github.com/stegoer/client/actions/workflows/docs.yml/badge.svg)](https://github.com/stegoer/client/actions/workflows/docs.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/stegoer/client/master.svg)](https://results.pre-commit.ci/latest/github/stegoer/client/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://prettier.io/)

Client is using TypeScript, NextJS and GraphQL.

---

Client website: https://stegoer.netlify.app/

Development documentation: https://github.com/stegoer/client/blob/main/README.md

Reference documentation: https://stegoer.github.io/client

Source code: https://github.com/stegoer/client

---

## Installation

### Install instructions

1. Install Node.js https://nodejs.org/en/download/
2. Clone this repository

```sh
git clone git@github.com:stegoer/client.git
```

4. Install dependencies

```sh
npm install
```

#### Create the `.env.local` file

Create a `.env.local` file and copy the contents of `.env.local.example` file into the `.env.local` file

```sh
cp .env.local.example .env.local
```

## Development

### Dev server

```sh
npm run dev
```

### [package.json](https://github.com/stegoer/client/blob/master/package.json) scripts

```sh
npm run-script
```

### GraphQL

[GraphQL Code Generator](https://www.graphql-code-generator.com/)
is used to generate type definitions and hooks for queries and mutations. See `client/src/graphql/codegen.yml` for
configuration options.

#### Codegen

```sh
npm run graphql:gen
```

To add a new query or mutation head to `src/graphql/user` or
`src/graphql/image` and add a new file.

To add a new fragment head to the `src/graphql/fragments` folder.

### Reference documentation

```sh
npm run docs:build
```

[TypeDoc](https://github.com/TypeStrong/typedoc) is used to generate documentation
which is then published via the
[Docs GitHub Action](https://github.com/stegoer/client/blob/master/.github/workflows/docs.yml)
on [GitHub Pages](https://pages.github.com/).

See [typedoc.json](https://github.com/stegoer/client/blob/master/typedoc.json)
for configuration.

## Contributing

```sh
pre-commit install
```

## License

Developed under the [MIT](https://github.com/stegoer/client/blob/master/LICENSE) license.
