package steganography

import (
	"bytes"
	"fmt"

	"github.com/kucera-lukas/stegoer/graph/generated"
	"github.com/kucera-lukas/stegoer/pkg/util"
)

// Encode encodes a message into the given graphql.Upload file based on input.
func Encode(input generated.EncodeImageInput) (*bytes.Buffer, error) {
	data, err := FileToImageData(input.File.File)
	if err != nil {
		return nil, err
	}

	pixelChannel := make(chan PixelData)
	go NRGBAPixels(data, input.Channel, pixelChannel)

	bitChannel := make(chan byte)
	go util.TextToBits(input.Message, bitChannel)

	lsbPosChannel := make(chan byte)
	go util.LSBPositions(byte(input.LsbUsed), lsbPosChannel)

pixelIterator:
	for pixelData := range pixelChannel {
		for _, pixelChannel := range pixelData.Channels {
			msgBit, ok := <-bitChannel
			// there are no more bits in the message
			if !ok {
				break pixelIterator
			}

			lsbPos := <-lsbPosChannel

			switch {
			case pixelChannel.IsRed():
				pixelData.SetRed(getUpdatedByte(msgBit, pixelData.GetRed(), lsbPos))
			case pixelChannel.IsGreen():
				pixelData.SetGreen(getUpdatedByte(msgBit, pixelData.GetGreen(), lsbPos))
			case pixelChannel.IsBlue():
				pixelData.SetBlue(getUpdatedByte(msgBit, pixelData.GetBlue(), lsbPos))
			}
		}

		data.NRGBA.SetNRGBA(pixelData.Width, pixelData.Height, *pixelData.Color)
	}

	imgBuffer, err := EncodeNRGBA(data.NRGBA)
	if err != nil {
		return nil, fmt.Errorf("encode: %w", err)
	}

	return imgBuffer, nil
}

func getUpdatedByte(msgBit byte, value byte, lsbPos byte) byte {
	hasBit := util.HasBit(value, lsbPos)

	if msgBit == 0 && hasBit {
		return util.ClearBit(value, lsbPos)
	} else if msgBit == 1 && !hasBit {
		return util.SetBit(value, lsbPos)
	}

	return value
}
