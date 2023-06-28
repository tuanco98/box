import { delBotRewardIndex, delRewardBoxData, getBotRewardIndex, getIndexBotReward, getRewardBoxData, setIndexBotReward } from "../../cache"
import { Box, BoxStatus } from "../../models/Box"
import { NftType } from "../../models/Common"
import { Reward } from "../../models/Reward"
import { Boxes, mongo, Rewards } from "../../mongodb"
import { mili_timestamp } from "../../utils"
import { web3 } from "../../web3"
import { OpenBox } from "./unbox_result_engine"

const handleUnbox = async (box: Box) => {
    try {
        const buybox_blockHash = (await web3.eth.getBlock(box.buyBox_blockNumber)).hash
        if (box.unbox_blockNumber == null) throw new Error(`blocknumber missing`)
        if (box.typeBox === null || box.typeBox === undefined) throw new Error(`typebox missing`)
        const unbox_block = await web3.eth.getBlock(box.unbox_blockNumber)
        const { hash: unbox_blockHash, timestamp } = unbox_block
        const unbox_result = OpenBox(box.ownerAddress, unbox_blockHash, buybox_blockHash, box.tokenId, box.typeBox)
        return { unbox_result, timestamp }
    } catch (e) {
        throw e
    }
}
export const unboxHandle = async (box: Box) => {
    const session = mongo.startSession()
    try {
        const { unbox_result, timestamp } = await handleUnbox(box)
        const index = await getBotRewardIndex(`${box.tokenId}`) || 0
        await delBotRewardIndex(`${box.tokenId}`)
        let newReward: Reward = {
            tokenId: box.tokenId,
            nftType: NftType.box,
            typeBox: box.typeBox,
            isReward: false,
            bot_index: index,
            unboxedAt: mili_timestamp(timestamp),
            unboxResults: unbox_result,
        }
        const get_cache_data = await getRewardBoxData(box.tokenId)
        if (get_cache_data) {
            Object.assign(newReward, {
                isReward: get_cache_data.isReward,
                reward_to_owner: get_cache_data.reward_to_owner,
                txid: get_cache_data.txid,
                blockNumber: get_cache_data.blockNumber,
                rewardAt: get_cache_data.rewardAt,
            })
            await delRewardBoxData(box.tokenId)
        }

        await session.withTransaction(async () => {
            await Promise.all([
                Boxes.updateOne(
                        { tokenId: box.tokenId },
                        {
                            $set: { status: BoxStatus.opened },
                        },
                        { session }
                    ),
                Rewards.insertOne(newReward, { session }),
            ]) 
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
