import { EventData } from "web3-eth-contract"
import { Box } from "../../../models/Box"

import { Boxes, mongo } from "../../../mongodb"

export let buyBoxEvent = {}
export let buyBoxEventLog = {}

const deleteBuyBoxEvent = (hash: string, owner: string) => {
    buyBoxEvent[`${hash}_${owner}`] = []
    buyBoxEventLog[`${hash}_${owner}`] = []
}
const mappingBoxDataWithBoxType = (eventHash: string, typeBox: number, buyer: string) => {
    const boxData = buyBoxEvent[`${eventHash}_${buyer}`]
    if (!boxData) return []
    const result: Box[] = boxData.map((box_data: Box) => {
        return { ...box_data, typeBox }
    })
    return result
}

export const buyBox = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        await session.withTransaction(async () => {
            const { typeBox, buyer } = event.returnValues
            const { transactionHash} = event
            const isConsumeThisEvent = await Boxes.findOne({buyBox_txid: transactionHash}, {session})
            if (isConsumeThisEvent) return
            const mappingResult = mappingBoxDataWithBoxType(transactionHash, Number(typeBox), buyer)
            if (mappingResult.length) {
                await Boxes.insertMany(mappingResult, { session })
            }
            deleteBuyBoxEvent(transactionHash, buyer)
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}