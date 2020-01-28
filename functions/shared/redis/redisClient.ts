import { promisify } from "util";
import redis from "redis";

const redisIp = process.env.REDIS_IP;
const redisPort = parseInt(process.env.REDIS_PORT || "6379");

const _redisClient = redis.createClient(redisPort, redisIp);

const connectionPromise = new Promise((resolve, reject) => {
  _redisClient.on("connect", function() {
    resolve();
  });
  _redisClient.on("error", function(err) {
    console.log("Something went wrong " + err);
    reject(err);
  });
});

export async function redisClient() {
  await connectionPromise;
  return {
    set: promisify(_redisClient.set).bind(_redisClient),
    get: promisify(_redisClient.get).bind(_redisClient),
  };
}
