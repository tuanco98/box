import { EventData } from "web3-eth-contract"
import { Box } from "../../../models/Box"

import { Boxes, mongo } from "../../../mongodb"

export let buyBox2Event = {}
export let buyBox2EventLog = {}

const deleteBuyBoxEvent = (hash: string, owner: string) => {
    buyBox2Event[`${hash}_${owner}`] = []
    buyBox2EventLog[`${hash}_${owner}`] = []
}
const mappingBoxDataWithBoxType = (eventHash: string, typeBox: number, buyer: string) => {
    const boxData = buyBox2Event[`${eventHash}_${buyer}`]
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
