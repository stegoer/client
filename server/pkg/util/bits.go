package util

import (
	"fmt"
	"strconv"
)

const (
	binaryBase = 2
	bitSize    = 8
)

func TextToBits(str string, resultChan chan byte) {
	var position byte

	byteArr := []byte(str)

	for _, b := range byteArr {
		for position = 0; position < 8; position++ {
			if HasBit(b, position) {
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

func BinaryToText(str string) (string, error) {
	i, err := strconv.ParseInt(str, binaryBase, bitSize)
	if err != nil {
		return "", fmt.Errorf("failed to parse binary text as a string: %w", err)
	}

	return string(i), nil //nolint:govet
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

// BoolToByte turn bool into byte.
func BoolToByte(b bool) byte {
	if b {
		return 1
	}

	return 0
}
