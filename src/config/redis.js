const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

let redisClient;

(async () => {
    redisClient = redis.createClient({
        url: process.env.REDIS_URL,
    });
    redisClient.on("error", (err) => {
        console.error("Redis Client Error", err);
    }
    );
    redisClient.on("connect", () => {
        console.log("Connected to Redis");
    }
    );
    await redisClient.connect();
}
)();
module.exports = redisClient;
    