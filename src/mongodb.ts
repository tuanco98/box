import { MongoClient, Db, Collection } from 'mongodb'
import { successConsoleLog } from './color-log'
import { Box, BoxIndexes } from './models/Box'
import { CurrentBlock, CurrentBlockIndexes } from './models/CurrentBlock'
import { Reward, RewardIndexes } from './models/Reward'

let mongo: MongoClient

export let Boxes: Collection<Box>
export let Rewards: Collection<Reward>
export let Current_Block: Collection<CurrentBlock>

const collections = {
    boxes: 'boxes',
    rewards: 'rewards',
    current_block: 'current_block',
}

const connectMongo = async (MONGO_URI: string) => {
    try {
        console.log('MONGO_URI', MONGO_URI)
        
        mongo = new MongoClient(MONGO_URI)

        await mongo.connect()

        mongo.on('error', async (e) => {
            try {
                await mongo.close()
                await connectMongo(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('timeout', async () => {
            try {
                await mongo.close()
                await connectMongo(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('close', async () => {
            try {
                await connectMongo(MONGO_URI)
            } catch (e) {
                throw e
            }
        })
        const db = mongo.db()

        Boxes = db.collection(collections.boxes)
        Current_Block = db.collection(collections.current_block)
        Rewards = db.collection(collections.rewards)

        await Promise.all([
            Rewards.createIndexes(RewardIndexes),
            Boxes.createIndexes(BoxIndexes),
            Current_Block.createIndexes(CurrentBlockIndexes),
        ])
        
        successConsoleLog(`🚀 mongodb: connected`)
    } catch (e) {
        console.error(`mongodb: disconnected`)
        await mongo?.close(true)
        setTimeout(connectMongo, 1000)
        throw e
    }
}

export { mongo, connectMongo, collections }


