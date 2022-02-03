package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/kucera-lukas/stegoer/graph/generated"
	"github.com/kucera-lukas/stegoer/pkg/entity/model"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/middleware"
	"github.com/kucera-lukas/stegoer/pkg/util"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input generated.NewUser) (*generated.CreateUserPayload, error) {
	var errors []*model.Error

	entUser, err := r.controller.User.Create(ctx, input)
	if err != nil {
		return &generated.CreateUserPayload{
			User:   nil,
			Auth:   nil,
			Errors: append(errors, err),
		}, nil
	}

	auth, err := util.GenerateAuth(ctx, *entUser)
	if err != nil {
		return &generated.CreateUserPayload{
			User:   nil,
			Auth:   nil,
			Errors: append(errors, err),
		}, nil
	}

	return &generated.CreateUserPayload{
		User:   entUser,
		Auth:   auth,
		Errors: errors,
	}, nil
}

func (r *mutationResolver) Login(ctx context.Context, input generated.Login) (*generated.LoginPayload, error) {
	var errors []*model.Error

	entUser, _ := r.controller.User.Get(ctx, input.Username)

	if entUser == nil || !util.CheckPasswordHash(
		input.Password,
		entUser.Password,
	) {
		err := model.NewNotFoundError(
			ctx,
			"username or password is incorrect",
			"user",
		)

		return &generated.LoginPayload{
			User:   nil,
			Auth:   nil,
			Errors: append(errors, err),
		}, nil
	}

	auth, err := util.GenerateAuth(ctx, *entUser)
	if err != nil {
		return &generated.LoginPayload{
			User:   nil,
			Auth:   nil,
			Errors: append(errors, err),
		}, nil
	}

	return &generated.LoginPayload{
		User:   entUser,
		Auth:   auth,
		Errors: errors,
	}, nil
}

func (r *mutationResolver) RefreshToken(ctx context.Context, input generated.RefreshTokenInput) (*generated.RefreshTokenPayload, error) {
	var errors []*model.Error

	username, err := util.ParseToken(ctx, input.Token)
	if err != nil {
		return &generated.RefreshTokenPayload{
			User:   nil,
			Auth:   nil,
			Errors: append(errors, err),
		}, nil
	}

	entUser, err := r.controller.User.Get(ctx, username)
	if err != nil {
		return &generated.RefreshTokenPayload{
			User:   nil,
			Auth:   nil,
			Errors: append(errors, err),
		}, nil
	}

	auth, err := util.GenerateAuth(ctx, *entUser)
	if err != nil {
		return &generated.RefreshTokenPayload{
			User:   nil,
			Auth:   nil,
			Errors: append(errors, err),
		}, nil
	}

	return &generated.RefreshTokenPayload{
		User:   entUser,
		Auth:   auth,
		Errors: errors,
	}, nil
}

func (r *mutationResolver) UpdateUser(ctx context.Context, input generated.UpdateUser) (*generated.UpdateUserPayload, error) {
	var errors []*model.Error

	entUser, err := middleware.JwtForContext(ctx)
	if err != nil {
		return &generated.UpdateUserPayload{
			User:   nil,
			Errors: append(errors, err),
		}, nil
	}

	entUser, err = r.controller.User.Update(ctx, *entUser, input)
	if err != nil {
		return &generated.UpdateUserPayload{
			User:   nil,
			Errors: append(errors, err),
		}, nil
	}

	return &generated.UpdateUserPayload{
		User:   entUser,
		Errors: errors,
	}, nil
}

func (r *queryResolver) Overview(ctx context.Context) (*generated.OverviewPayload, error) {
	var errors []*model.Error

	entUser, err := middleware.JwtForContext(ctx)
	if err != nil {
		return &generated.OverviewPayload{
			User:   nil,
			Errors: append(errors, err),
		}, nil
	}

	return &generated.OverviewPayload{
		User:   entUser,
		Errors: errors,
	}, nil
}
