package apq

import (
	"context"
	"time"

	"github.com/go-redis/redis/v8"
)

// Cache represents a redis.Client for Automatic Persisted Queries.
type Cache struct {
	client redis.Client
	ttl    time.Duration
}

const (
	KeyPrefix = "apq:"
	TTL       = time.Hour * 24
)

// NewCache returns a new Cache instance for Automatic Persisted Queries.
func NewCache(client redis.Client) *Cache {
	return &Cache{client: client, ttl: TTL}
}

// Add adds a new k/v pair to the Cache instance.
func (c *Cache) Add(ctx context.Context, key string, value interface{}) {
	c.client.Set(ctx, getKey(key), value, c.ttl)
}

// Get retrieves a value from the Cache instance.
func (c *Cache) Get(ctx context.Context, key string) (interface{}, bool) {
	res, err := c.client.Get(ctx, getKey(key)).Result()
	if err != nil {
		return nil, false
	}

	return res, true
}

func getKey(key string) string {
	return KeyPrefix + key
}
