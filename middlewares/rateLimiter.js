import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../utils/redisClient.js';

const limiter = rateLimit({
  windowMs: 60 * 1000, // for 1 min 60 * 1000 = 60000 milliseconds
  max: 30,   // 30 requests per minute
  standardHeaders: true, 
  legacyHeaders: false,
  store: new RedisStore({   
    sendCommand: (...args) => redisClient.sendCommand(args)
  })
});

export default limiter;
