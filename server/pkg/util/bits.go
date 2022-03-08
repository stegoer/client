package util

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"strconv"
	"strings"
)

const (
	binaryBase = 2
	bitLen     = 8
	bitSize    = 32
)

// TextToBits turns given string into bits and sends it over a channel.
func TextToBits(text string, resultChan chan byte) {
	var position byte

	byteArr := []byte(text)

	for _, b := range byteArr {
		for position = bitLen; position > 0; position-- {
			// need to offset starting position by 1
			if HasBit(b, position-1) {
				resultChan <- 1
			} else {
				resultChan <- 0
			}
		}
	}

	close(resultChan)
}

// LSBPositions infinitely sends the least significant bits positions.
func LSBPositions(used byte, resultChan chan byte) {
	var position byte

	for position = 0; position <= used; position++ {
		resultChan <- position

		if position == used {
			position = 0
		}
	}

	close(resultChan)
}

// BinaryBufferToText turns the data from bytes.Buffer into a string.
func BinaryBufferToText(binBuffer *bytes.Buffer) (string, error) {
	var textBuilder strings.Builder

	bufferLen := binBuffer.Len()

	if bufferLen%bitLen != 0 {
		return "", errors.New("invalid buffer length")
	}

	for i := 0; i < bufferLen; i += bitLen {
		strChunk, err := io.ReadAll(io.LimitReader(binBuffer, bitLen))
		if err != nil {
			return "", fmt.Errorf("failed reading from buffer: %w", err)
		}

		parsedInt, err := strconv.ParseInt(string(strChunk), binaryBase, bitSize)
		if err != nil {
			return "", fmt.Errorf("failed to parse %s as a string: %w", strChunk, err)
		}

		textBuilder.WriteRune(rune(parsedInt))
	}

	return textBuilder.String(), nil
}

// SetBit sets the bit at pos in the integer n.
func SetBit(n byte, pos byte) byte {
	n |= 1 << pos

	return n
}

// ClearBit clears the bit at pos in n.
func ClearBit(n byte, pos byte) byte {
	n &= ^(1 << pos)

	return n
}

// HasBit returns whether the byte n has a bit set on the pos.
func HasBit(n byte, pos byte) bool {
	val := n & (1 << pos)

	return val > 0
}

// BoolToRune turns bool into rune.
func BoolToRune(b bool) rune {
	if b {
		return '1'
	}

	return '0'
}
