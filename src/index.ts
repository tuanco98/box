import { config_VISABLE_PLAYGROUND, config_MONGO_URI, config_WEB3_PROVIDER, enable_bot } from "./config";
import { initGraphQLServer } from "./graphql";
import { connectMongo } from "./mongodb";
import { connectRedis } from "./redis";
import { initSentry } from "./sentry";
import { services } from "./services";
import { connectWeb3, web3 } from "./web3";

(async () => {
    try {
        await initSentry();
        await Promise.all([
            connectMongo(config_MONGO_URI),
            connectRedis(),
            connectWeb3(config_WEB3_PROVIDER),
            initGraphQLServer(),
        ])
        console.log('BOT:', enable_bot)
        console.log('- VISABLE PLAYGROUND:', config_VISABLE_PLAYGROUND)
        const latest_block = await web3.eth.getBlockNumber()
        console.log('latest block:', latest_block)
        await services();
    } catch (e) {
        throw e
    }
})();