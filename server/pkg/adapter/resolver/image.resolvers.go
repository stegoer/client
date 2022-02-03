package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/kucera-lukas/stegoer/ent"
	"github.com/kucera-lukas/stegoer/graph/generated"
	"github.com/kucera-lukas/stegoer/pkg/entity/model"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/middleware"
)

func (r *mutationResolver) CreateImage(ctx context.Context, input generated.NewImage) (*generated.CreateImagePayload, error) {
	var errors []*model.Error

	entUser, err := middleware.JwtForContext(ctx)
	if err != nil {
		return &generated.CreateImagePayload{
			Image:  nil,
			Errors: append(errors, err),
		}, nil
	}

	entImage, err := r.controller.Image.Create(ctx, *entUser, input)
	if err != nil {
		return &generated.CreateImagePayload{
			Image:  nil,
			Errors: append(errors, err),
		}, nil
	}

	return &generated.CreateImagePayload{
		Image:  entImage,
		Errors: errors,
	}, nil
}

func (r *queryResolver) Images(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ImageWhereInput, orderBy *ent.ImageOrder) (*generated.ImagesPayload, error) {
	var errors []*model.Error

	entUser, err := middleware.JwtForContext(ctx)
	if err != nil {
		return &generated.ImagesPayload{
			TotalCount: nil,
			PageInfo:   nil,
			Edges:      []*ent.ImageEdge{},
			Errors:     append(errors, err),
		}, nil
	}

	imageList, err := r.controller.Image.List(
		ctx,
		*entUser,
		after,
		first,
		before,
		last,
		where,
		orderBy,
	)
	if err != nil {
		return &generated.ImagesPayload{
			TotalCount: nil,
			PageInfo:   nil,
			Edges:      []*ent.ImageEdge{},
			Errors:     append(errors, err),
		}, nil
	}

	return &generated.ImagesPayload{
		TotalCount: &imageList.TotalCount,
		PageInfo:   &imageList.PageInfo,
		Edges:      imageList.Edges,
		Errors:     errors,
	}, nil
}
