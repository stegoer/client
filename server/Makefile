export GOBIN ?= $(shell pwd)/bin

ENT = $(GOBIN)/ent
GQLGEN = $(GOBIN)/gqlgen
GOLANGCI_LINT = $(GOBIN)/golangci-lint
GO_IMPORTS = $(GOBIN)/goimports-reviser

# Directories containing independent Go modules.
MODULE_DIRS = . ./tools

# Many Go tools take file globs or directories as arguments instead of packages.
GO_FILES := $(shell \
	find . '(' -path '*/.*' -o -path './vendor' ')' -prune \
	-o -name '*.go' -print | cut -b3-)

$(ENT):
	cd tools && go install entgo.io/ent/cmd/ent

$(GQLGEN):
	cd tools && go install github.com/99designs/gqlgen

$(GOLANGCI_LINT):
	cd tools && go install github.com/golangci/golangci-lint/cmd/golangci-lint

$(GO_IMPORTS):
	cd tools && go install github.com/incu6us/goimports-reviser

.PHONY: help codegen fmt lint tidy test cover ci dev

default: help

help:
	@echo "Please use 'make <target>'"
	@echo "Check the Makefile to know exactly what each target is doing."

codegen: $(ENT) $(GQLGEN)
	@echo "Generating ent..."
	@$(ENT) generate ./ent/schema
	@echo "Generating gqlgen..."
	@$(GQLEN)

fmt: $(GO_IMPORTS)
	@echo "Formatting..."
	@$(foreach file,$(GO_FILES),($(GO_IMPORTS) -project-name stegoer -rm-unused -file-path $(file)) &&) true

lint: $(GOLANGCI_LINT)
	@echo "Linting..."
	@$(GOLANGCI_LINT) run --fix --allow-parallel-runners ./... 2>&1

tidy:
	@$(foreach dir,$(MODULE_DIRS),(cd $(dir) && go mod tidy -compat=1.17) &&) true

test:
	@echo "Testing..."
	@$(foreach dir,$(MODULE_DIRS),(cd $(dir) && go test -race ./...) &&) true

cover:
	go test -race -coverprofile=cover.out -coverpkg=./... ./...
	go tool cover -html=cover.out -o cover.html

ci: $(GO_IMPORTS)
	@make codegen
	@make fmt
	@make lint
	@make tidy
	# @make test
	# @make cover

dev:
	@echo "Starting server..."
	@go run cmd/stegoer-server/main.go
