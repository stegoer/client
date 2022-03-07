package steganography

import (
	"errors"
	"fmt"
	"image"
	"image/color"
	"image/draw"
	"io"

	entImage "github.com/kucera-lukas/stegoer/ent/image"
	"github.com/kucera-lukas/stegoer/pkg/util"
)

type NRGBAData struct {
	Data   *image.NRGBA
	Width  int
	Height int
}

type ChannelType byte

type PixelData struct {
	Width   int
	Height  int
	Channel ChannelType
	Color   color.NRGBA
}

const (
	RedChannel ChannelType = iota
	GreenChannel
	BlueChannel
)

func (pd PixelData) IsRed() bool {
	return pd.Channel == RedChannel
}

func (pd PixelData) IsGreen() bool {
	return pd.Channel == GreenChannel
}

func (pd PixelData) IsBlue() bool {
	return pd.Channel == BlueChannel
}

func (pd PixelData) GetColorValue() (byte, error) {
	switch {
	case pd.IsRed():
		return pd.Color.R, nil
	case pd.IsGreen():
		return pd.Color.G, nil
	case pd.IsBlue():
		return pd.Color.B, nil
	}

	return 0, errors.New("invalid color type")
}

func (pd PixelData) SetColorValue(value byte) {
	switch {
	case pd.IsRed():
		pd.Color.R = value
	case pd.IsGreen():
		pd.Color.G = value
	case pd.IsBlue():
		pd.Color.B = value
	}
}

func NRGBAPixels(
	nrgba NRGBAData,
	channel entImage.Channel,
	resultChan chan PixelData,
) {
	red := util.IncludesRedChannel(channel)
	green := util.IncludesGreenChannel(channel)
	blue := util.IncludesBlueChannel(channel)

	for width := 0; width < nrgba.Width; width++ {
		for height := 0; height < nrgba.Height; height++ {
			nrgbaColor := nrgba.Data.NRGBAAt(width, height)

			if red {
				resultChan <- PixelData{
					Width:   width,
					Height:  height,
					Channel: RedChannel,
					Color:   nrgbaColor,
				}
			}

			if green {
				resultChan <- PixelData{
					Width:   width,
					Height:  height,
					Channel: GreenChannel,
					Color:   nrgbaColor,
				}
			}

			if blue {
				resultChan <- PixelData{
					Width:   width,
					Height:  height,
					Channel: BlueChannel,
					Color:   nrgbaColor,
				}
			}
		}
	}

	close(resultChan)
}

func FileToNRGBA(file io.Reader) (NRGBAData, error) {
	img, err := ReadImageFile(file)
	if err != nil {
		return NRGBAData{Data: nil, Width: 0, Height: 0}, err
	}

	return ImageToNRGBA(img), nil
}

// ReadImageFile reads given file and returns image.Image.
func ReadImageFile(file io.Reader) (image.Image, error) {
	img, _, err := image.Decode(file)
	if err != nil {
		return nil, fmt.Errorf("failed to decode image file: %w", err)
	}

	return img, nil
}

// ImageToNRGBA converts image.Image to NRGBAData.
func ImageToNRGBA(img image.Image) NRGBAData {
	bounds := img.Bounds()

	width, height := bounds.Dx(), bounds.Dy()
	ret := image.NewNRGBA(image.Rect(0, 0, width, height))

	draw.Draw(ret, ret.Bounds(), img, bounds.Min, draw.Src)

	return NRGBAData{Data: ret, Width: width, Height: height}
}
