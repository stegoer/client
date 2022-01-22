// Code generated by entc, DO NOT EDIT.

package ent

import (
	"time"

	"github.com/kucera-lukas/stegoer/ent/image"
	"github.com/kucera-lukas/stegoer/ent/schema"
	"github.com/kucera-lukas/stegoer/ent/schema/ulid"
	"github.com/kucera-lukas/stegoer/ent/user"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	imageMixin := schema.Image{}.Mixin()
	imageMixinFields0 := imageMixin[0].Fields()
	_ = imageMixinFields0
	imageMixinFields2 := imageMixin[2].Fields()
	_ = imageMixinFields2
	imageFields := schema.Image{}.Fields()
	_ = imageFields
	// imageDescCreatedAt is the schema descriptor for created_at field.
	imageDescCreatedAt := imageMixinFields2[0].Descriptor()
	// image.DefaultCreatedAt holds the default value on creation for the created_at field.
	image.DefaultCreatedAt = imageDescCreatedAt.Default.(func() time.Time)
	// imageDescUpdatedAt is the schema descriptor for updated_at field.
	imageDescUpdatedAt := imageMixinFields2[1].Descriptor()
	// image.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	image.DefaultUpdatedAt = imageDescUpdatedAt.Default.(func() time.Time)
	// image.UpdateDefaultUpdatedAt holds the default value on update for the updated_at field.
	image.UpdateDefaultUpdatedAt = imageDescUpdatedAt.UpdateDefault.(func() time.Time)
	// imageDescID is the schema descriptor for id field.
	imageDescID := imageMixinFields0[0].Descriptor()
	// image.DefaultID holds the default value on creation for the id field.
	image.DefaultID = imageDescID.Default.(func() ulid.ID)
	userMixin := schema.User{}.Mixin()
	userMixinFields0 := userMixin[0].Fields()
	_ = userMixinFields0
	userMixinFields2 := userMixin[2].Fields()
	_ = userMixinFields2
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescCreatedAt is the schema descriptor for created_at field.
	userDescCreatedAt := userMixinFields2[0].Descriptor()
	// user.DefaultCreatedAt holds the default value on creation for the created_at field.
	user.DefaultCreatedAt = userDescCreatedAt.Default.(func() time.Time)
	// userDescUpdatedAt is the schema descriptor for updated_at field.
	userDescUpdatedAt := userMixinFields2[1].Descriptor()
	// user.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	user.DefaultUpdatedAt = userDescUpdatedAt.Default.(func() time.Time)
	// user.UpdateDefaultUpdatedAt holds the default value on update for the updated_at field.
	user.UpdateDefaultUpdatedAt = userDescUpdatedAt.UpdateDefault.(func() time.Time)
	// userDescName is the schema descriptor for name field.
	userDescName := userFields[0].Descriptor()
	// user.NameValidator is a validator for the "name" field. It is called by the builders before save.
	user.NameValidator = userDescName.Validators[0].(func(string) error)
	// userDescID is the schema descriptor for id field.
	userDescID := userMixinFields0[0].Descriptor()
	// user.DefaultID holds the default value on creation for the id field.
	user.DefaultID = userDescID.Default.(func() ulid.ID)
}
