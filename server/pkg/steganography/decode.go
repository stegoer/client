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

	data, err := FileToImageData(input.File.File)
	if err != nil {
		return "", err
	}

	pixelChannel := make(chan PixelData)
	go NRGBAPixels(data, input.Channel, pixelChannel)

	lsbPosChannel := make(chan byte)
	go util.LSBPositions(byte(input.LsbUsed), lsbPosChannel)

	for pixelData := range pixelChannel {
		for _, pixelChannel := range pixelData.Channels {
			var value byte

			switch {
			case pixelChannel.IsRed():
				value = pixelData.GetRed()
			case pixelChannel.IsGreen():
				value = pixelData.GetGreen()
			case pixelChannel.IsBlue():
				value = pixelData.GetBlue()
			}

			lsbPos := <-lsbPosChannel
			hasBit := util.HasBit(value, lsbPos)

			bitArray = append(bitArray, util.BoolToByte(hasBit))

			if len(bitArray) == bitLength {
				messageBuilder.WriteString(string(bitArray))
				bitArray = nil
			}
		}
	}

	ret, err := util.BinaryToText(messageBuilder.String())
	if err != nil {
		return "", fmt.Errorf("decode: %w", err)
	}

	return ret, nil
}
