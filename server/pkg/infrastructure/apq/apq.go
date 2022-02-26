package apq

import (
	"context"
	"time"

	"github.com/go-redis/redis/v8"
)

type Cache struct {
	client redis.Client
	ttl    time.Duration
}

const (
	KeyPrefix = "apq:"
	TTL       = time.Hour * 24
)

func NewCache(client redis.Client) *Cache {
	return &Cache{client: client, ttl: TTL}
}

func (c *Cache) Add(ctx context.Context, key string, value interface{}) {
	c.client.Set(ctx, getKey(key), value, c.ttl)
}

func (c *Cache) Get(ctx context.Context, key string) (interface{}, bool) {
	res, err := c.client.Get(ctx, getKey(key)).Result()
	if err != nil {
		return struct{}{}, false
	}

	return res, true
}

func getKey(key string) string {
	return KeyPrefix + key
}
