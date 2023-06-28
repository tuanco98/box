import { ClientSession } from "mongodb"
import { Contract } from "web3-eth-contract"

import { enable_bot } from "../../config"
import { Reward } from "../../models/Reward"
import { mongo, Rewards } from "../../mongodb"
import { convertReward, isBalanceGreaterThanLimit, mili_timestamp } from "../../utils"
import { boxContract, boxContract_2, web3 } from "../../web3"

let time_out = 500

const getUnboxReadyToReward = async (index: number, address: string, session: ClientSession) => {
    try {
        const reward = await Rewards.findOne(
            { isReward: false, bot_index: index, error: { $exists: false } },
            { session }
        )
        if (reward) {
            console.log(`Bot ${index} reward queue: ${reward?.tokenId}`)
        }
        const ready_reward = await isReadyReward(index, address, reward, session)
        return ready_reward ? reward : null
    } catch (e) {
        throw e
    }
}
export const cron_reward_multi_bots = async (index: number, address: string) => {
    const session = mongo.startSession()
    try {
        if (!enable_bot) {
            time_out = 10000
            console.log("BOT REWARD: turn off")
            return
        }
        await session.withTransaction(async () => {
            const reward = await getUnboxReadyToReward(index, address, session)
            if (!reward) {
                time_out = 1000
                return
            }
            time_out = 100
            console.log(`Bot ${index} rewarding:`, reward?.tokenId)
            const rewardConvert = convertReward(reward.unboxResults)
            if (reward.tokenId < 1000000) {
                await signTransaction(boxContract, address, reward, rewardConvert.runeAmount, session)
            } else {
                await signTransaction(boxContract_2, address, reward, rewardConvert.runeAmount, session)
            }
            console.log(`Bot ${index} rewarded:`, reward?.tokenId)
        })
    } catch (e) {
        console.log(e)
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
        setTimeout(() => cron_reward_multi_bots(index, address), time_out)
    }
}
const signTransaction = async (
    contract: Contract,
    bot_address: string,
    reward: Reward,
    runeAmount: number[],
    session: ClientSession
) => {
    try {
        await contract.methods
            .reward(reward.tokenId, [...runeAmount, ...[0, 0, 0, 0]])
            .send({ from: bot_address, gas: 1000000 })
    } catch (e:any) {
        await handleErrorSendReward(e, reward, session)
    }
}
const isReadyReward = async (index: number, address: string, reward: Reward | null, session: ClientSession) => {
    try {
        if (!reward) return false
        const balance = await web3.eth.getBalance(address)
        if (!isBalanceGreaterThanLimit(balance)) {
            time_out = 5 * 60 * 1000
            throw new Error(`BOT REWARD ${index}: not enough balance`)
        }
        const { status } =
            reward.tokenId <= 1000000
                ? await boxContract.methods.boxDetails(reward.tokenId).call()
                : await boxContract_2.methods.boxDetails(reward.tokenId).call()
        if (Number(status) === 1) return true
        if (Number(status) === 2) {
            await Rewards.updateOne(
                { _id: reward._id},
                {
                    $set: {
                        isReward: true,
                    },
                },
                { session }
            )
        }
        return false
    } catch (e) {
        throw e
    }
}
const handleErrorSendReward = async (err: any, reward: Reward, session: ClientSession) => {
    try {
        console.log(err)
        const message = err
        let [transactionHash, blockNumber, status] = ["", 0, false]
        if (err.receipt) {
            transactionHash = err.receipt.transactionHash
            blockNumber = err.receipt.blockNumber
            status = err.receipt.status
        }
        const timestamp = blockNumber ? (await web3.eth.getBlock(blockNumber)).timestamp : +new Date()
        await Rewards.updateOne(
            { _id: reward._id },
            {
                $set: {
                    error: {
                        txid: transactionHash,
                        blockNumber,
                        status,
                        message,
                        timestamp: mili_timestamp(timestamp),
                    },
                },
            },
            { session }
        )
    } catch (e) {
        throw e
    }
}
