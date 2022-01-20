export GOBIN ?= $(shell pwd)/bin

GO_IMPORTS = $(GOBIN)/goimports-reviser

# Directories containing independent Go modules.
MODULE_DIRS = . ./tools

# Many Go tools take file globs or directories as arguments instead of packages.
GO_FILES := $(shell \
	find . '(' -path '*/.*' -o -path './vendor' ')' -prune \
	-o -name '*.go' -print | cut -b3-)

.PHONY: help lint tidy test cover codegen dev

default: help

help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo ""
	@echo "  lint        lint all source files"
	@echo "  tidy        check 'go mod tidy' of every module"
	@echo "  test        run all tests of each module directory"
	@echo "  cover   	 run tests with coverage report"
	@echo "  codegen     generate ent and graphql code"
	@echo "  dev         start development server"
	@echo ""
	@echo "Check the Makefile to know exactly what each target is doing."

lint: $(GO_IMPORTS)
	@echo "Formatting..."
	@$(foreach file,$(GO_FILES),($(GO_IMPORTS) -project-name stegoer -rm-unused -file-path $(file)) &&) true
	@echo "Linting..."
	@golangci-lint run ./... 2>&1
	@echo "Tidying go mod..."
	@make tidy

tidy:
	@$(foreach dir,$(MODULE_DIRS),(cd $(dir) && go mod tidy -compat=1.17) &&) true

$(GO_IMPORTS):
	cd tools && go install github.com/incu6us/goimports-reviser

test:
	@$(foreach dir,$(MODULE_DIRS),(cd $(dir) && go test -race ./...) &&) true

cover:
	go test -race -coverprofile=cover.out -coverpkg=./... ./...
	go tool cover -html=cover.out -o cover.html

codegen:
	@echo "Generating ent..."
	@ent generate ./ent/schema
	@echo "Generating gqlgen..."
	@gqlgen

dev:
	@echo "Starting server..."
	@go run cmd/stegoer-server/main.go
