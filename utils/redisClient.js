import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

// Create Redis client
const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

// Handle error events
redisClient.on('error', err => console.error(' Redis Client Error:', err));

// Connect to Redis
try {
  await redisClient.connect();
  console.log('✅ Redis client connected successfully');

  // Optional test (can be removed in production)
  await redisClient.set('foo', 'bar');
  const result = await redisClient.get('foo');
} catch (err) {
  console.error(' Redis connection failed:', err.message);
}

export default redisClient;
