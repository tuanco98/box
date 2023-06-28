import { EventData } from "web3-eth-contract"

import { Boxes, mongo } from "../../../mongodb"
import { BoxStatus } from "../../../models/Box"
import { web3 } from "../../../web3"
import { mili_timestamp } from "../../../utils"
import { getIndexBotReward, setBotRewardIndex, setIndexBotReward } from "../../../cache"

export const unbox = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { boxType, boxId } = event.returnValues
        await session.withTransaction(async () => {
            const getBox = await Boxes.findOne({ tokenId: Number(boxId), typeBox: Number(boxType) }, { session })
            if (!getBox) throw new Error(`box not found`)
            if (getBox.unbox) return
            const timestamp = (await web3.eth.getBlock(event.blockNumber)).timestamp
            await Boxes.updateOne(
                { tokenId: Number(boxId), typeBox: Number(boxType) },
                {
                    $set: {
                        unbox: true,
                        unbox_txid: event.transactionHash,
                        unbox_blockNumber: event.blockNumber,
                        unboxAt: mili_timestamp(timestamp),
                        status: BoxStatus.processing,
                    },
                },
                { session }
            )
            const {index} = await getIndexBotReward()
            await setBotRewardIndex(boxId, index)
            await setIndexBotReward(1)
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
