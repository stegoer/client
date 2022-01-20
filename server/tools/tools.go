//go:build tools
// +build tools

package tools

import (
	_ "entgo.io/ent/cmd/ent"
	_ "github.com/golangci/golangci-lint/cmd/golangci-lint"
	_ "github.com/incu6us/goimports-reviser"
)
