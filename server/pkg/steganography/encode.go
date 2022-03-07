package steganography

import (
	"bytes"
	"fmt"
	"image/png"
	"io"

	"github.com/kucera-lukas/stegoer/graph/generated"
	"github.com/kucera-lukas/stegoer/pkg/util"
)

func Encode(input generated.EncodeImageInput) (io.Reader, error) {
	nrgba, err := FileToNRGBA(input.File.File)
	if err != nil {
		return nil, err
	}

	pixelChannel := make(chan PixelData)
	go NRGBAPixels(nrgba, input.Channel, pixelChannel)

	bitChannel := make(chan byte)
	go util.TextToBits(input.Message, bitChannel)

	lsbPosChannel := make(chan byte)
	go util.LSBPositions(byte(input.LsbUsed), lsbPosChannel)

	imgBuffer := new(bytes.Buffer)

	for pixelData := range pixelChannel {
		value, err := pixelData.GetColorValue()
		if err != nil {
			return nil, fmt.Errorf(
				"pixel value at width: %d, height: %d is invalid: %w",
				pixelData.Width,
				pixelData.Height,
				err,
			)
		}

		msgBit, ok := <-bitChannel

		// there are no more bits in the message
		if !ok {
			if err := png.Encode(imgBuffer, nrgba.Data); err != nil {
				return nil, fmt.Errorf("error encoding result image: %w", err)
			}

			break
		}

		lsbPos := <-lsbPosChannel
		hasBit := util.HasBit(value, lsbPos)

		if msgBit == 0 && hasBit {
			pixelData.SetColorValue(util.ClearBit(value, lsbPos))
		} else if msgBit == 1 && !hasBit {
			pixelData.SetColorValue(util.SetBit(value, lsbPos))
		}

		nrgba.Data.SetNRGBA(pixelData.Width, pixelData.Height, pixelData.Color)
	}

	return imgBuffer, nil
}
