# stegoer - server

- Server is using Go, Postgres, GraphQL and Redis.

## Installation

### Install dependencies

```sh
go get ./...
```

### Copy and fill in environment variables

```sh
cp .env.example .env
```

### Initialize database

```sh
createdb stegoer
make migrate
```

## Development

### Dev server

```sh
redis-server
make dev
```

### Codegen

```sh
make gen
```

### Tests

```sh
make test
```

### Coverage

```sh
make cover
```
