import { BoxStatus } from "../../models/Box"
import { Boxes } from "../../mongodb"
import { unboxHandle } from "../systems/unbox_handle"

export const cron_handle_unbox = async () => {
    try {
        const TIME_OF_THREE_BLOCK_BSC = 9000
        const valid_timestamp = +new Date() - TIME_OF_THREE_BLOCK_BSC
        const getBoxProcessing = await Boxes.find({ status: BoxStatus.processing, unboxAt: { $lte: valid_timestamp } })
            .limit(100)
            .toArray()
        const promises: Promise<any>[] = []
        for (let box of getBoxProcessing) {
            promises.push(unboxHandle(box))
        }
        await Promise.all(promises)
    } catch (e) {
        throw e
    } finally {
        setTimeout(cron_handle_unbox, 100)
    }
}
