package steganography

import (
	"fmt"
	"strings"

	"github.com/kucera-lukas/stegoer/graph/generated"
	"github.com/kucera-lukas/stegoer/pkg/util"
)

const (
	bitLength = 8
)

func Decode(input generated.DecodeImageInput) (string, error) {
	var (
		messageBuilder strings.Builder
		bitArray       []byte
	)

	nrgba, err := FileToNRGBA(input.File.File)
	if err != nil {
		return "", err
	}

	pixelChannel := make(chan PixelData)
	go NRGBAPixels(nrgba, input.Channel, pixelChannel)

	lsbPosChannel := make(chan byte)
	go util.LSBPositions(byte(input.LsbUsed), lsbPosChannel)

	for pixelData := range pixelChannel {
		value, err := pixelData.GetColorValue()
		if err != nil {
			return "", fmt.Errorf(
				"decode: pixel value at width: %d, height: %d is invalid: %w",
				pixelData.Width,
				pixelData.Height,
				err,
			)
		}

		lsbPos := <-lsbPosChannel
		hasBit := util.HasBit(value, lsbPos)

		_ = append(bitArray, util.BoolToByte(hasBit))

		if len(bitArray) == bitLength {
			messageBuilder.WriteString(string(bitArray))
		}
	}

	ret, err := util.BinaryToText(messageBuilder.String())
	if err != nil {
		return "", fmt.Errorf("decode: %w", err)
	}

	return ret, nil
}
