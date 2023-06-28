import Redis from "ioredis"
import { successConsoleLog } from "./color-log";
import { config_REDIS_URI, config_SERVER_CODE_REDIS } from "./config";
export let ioredis: Redis.Redis

export const connectRedis = async () => {
    ioredis = new Redis(config_REDIS_URI, {
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    });
    if (ioredis["connector"]["connecting"]) {
        successConsoleLog(`🚀 redis: connected`)
    }
}

export const get_redis_connection_status = () => ioredis["connector"]["connecting"]

export const ClearRedis = () => {
    let stream = ioredis.scanStream({
        match: `the_parallel.${config_SERVER_CODE_REDIS}*`
    })
    stream.on('data', (keys) => {
        if (keys.length) {
            var pipeline = ioredis.pipeline();
            keys.forEach((key) => {
                pipeline.del(key)
            })
            return pipeline.exec()
        }
        console.log("data",keys)
       stream.pause()
    })
}