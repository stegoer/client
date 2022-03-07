package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	_ "image/png"

	"github.com/99designs/gqlgen/graphql"

	"github.com/kucera-lukas/stegoer/ent"
	"github.com/kucera-lukas/stegoer/graph/generated"
	"github.com/kucera-lukas/stegoer/pkg/entity/model"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/middleware"
	"github.com/kucera-lukas/stegoer/pkg/steganography"
)

func (r *mutationResolver) EncodeImage(ctx context.Context, input generated.EncodeImageInput) (*generated.EncodeImagePayload, error) {
	imgBuffer, err := steganography.Encode(input)
	if err != nil {
		return &generated.EncodeImagePayload{
			Image: nil,
			File: graphql.Upload{
				File:        nil,
				Filename:    "",
				Size:        0,
				ContentType: "",
			},
		}, model.NewValidationError(ctx, err.Error())
	}

	r.logger.Info("encoded buffer")

	entUser, err := middleware.JwtForContext(ctx)
	if err != nil {
		return &generated.EncodeImagePayload{
			Image: nil,
			File: graphql.Upload{
				File:        nil,
				Filename:    "",
				Size:        0,
				ContentType: "",
			},
		}, err
	}

	r.logger.Info("user: ", entUser)

	entImage, err := r.controller.Image.Create(ctx, *entUser, input)
	if err != nil {
		return &generated.EncodeImagePayload{
			Image: nil,
			File: graphql.Upload{
				File:        nil,
				Filename:    "",
				Size:        0,
				ContentType: "",
			},
		}, err
	}

	r.logger.Info("image ", entImage)

	return &generated.EncodeImagePayload{
		Image: entImage,
		File: graphql.Upload{
			File:        imgBuffer,
			Filename:    input.File.Filename,
			Size:        input.File.Size,
			ContentType: input.File.ContentType,
		},
	}, nil
}

func (r *mutationResolver) DecodeImage(ctx context.Context, input generated.DecodeImageInput) (*generated.DecodeImagePayload, error) {
	message, err := steganography.Decode(input)
	if err != nil {
		return &generated.DecodeImagePayload{
			Message: "",
		}, model.NewValidationError(ctx, err.Error())
	}

	return &generated.DecodeImagePayload{Message: message}, nil
}

func (r *queryResolver) Images(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ImageWhereInput, orderBy *ent.ImageOrder) (*generated.ImagesConnection, error) {
	entUser, err := middleware.JwtForContext(ctx)
	if err != nil {
		return &generated.ImagesConnection{
			TotalCount: 0,
			PageInfo: &ent.PageInfo{
				HasNextPage:     false,
				HasPreviousPage: false,
				StartCursor:     nil,
				EndCursor:       nil,
			},
			Edges: []*ent.ImageEdge{},
		}, err
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
		return &generated.ImagesConnection{
			TotalCount: 0,
			PageInfo: &ent.PageInfo{
				HasNextPage:     false,
				HasPreviousPage: false,
				StartCursor:     nil,
				EndCursor:       nil,
			},
			Edges: []*ent.ImageEdge{},
		}, err
	}

	return &generated.ImagesConnection{
		TotalCount: imageList.TotalCount,
		PageInfo:   &imageList.PageInfo,
		Edges:      imageList.Edges,
	}, nil
}
