

import { config_MONGO_URI } from "./config"
import { collections, connectMongo, mongo } from "./mongodb"
import { ClearRedis, connectRedis } from "./redis"

const reset = async () => {
    //Remove redis
    await connectRedis()
    ClearRedis()
    //Remove mongo
    await connectMongo(config_MONGO_URI)
    for (let collection_name of Object.values(collections)) {
        const deleteRes = await mongo.db().collection(collection_name).deleteMany({})
        console.log(`Delete ${deleteRes.deletedCount} in collection ${collection_name}`)
    }
    //Remove local
    console.log(`DONE ...`)
    return
}

reset()