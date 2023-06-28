import { EventData } from "web3-eth-contract"
import { setRewardBoxData } from "../../../cache"
import { mongo, Rewards } from "../../../mongodb"
import { mili_timestamp } from "../../../utils"
import { web3 } from "../../../web3"
export const reward = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { boxId, owner } = event.returnValues
        await session.withTransaction(async () => {
            const { timestamp } = await web3.eth.getBlock(event.blockNumber)

            const get_reward = await Rewards.findOne({ tokenId: Number(boxId) }, { session })

            const dataReward = {
                isReward: true,
                reward_to_owner: owner,
                txid: event.transactionHash,
                blockNumber: event.blockNumber,
                rewardAt: mili_timestamp(timestamp),
            }
            if (!get_reward) {
                await setRewardBoxData(boxId, dataReward)
                return
            }
            if (get_reward.txid != null) {
                return
            }
            await Rewards.updateOne(
                { tokenId: Number(boxId) },
                {
                    $set: { ...dataReward },
                },
                { session }
            )
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
