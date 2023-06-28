import { config_CONFIRMATION_BLOCK_NUMBER } from "../../config"
import { web3 } from "../../web3"

export let latestBlockNumber = 0
export const cron_get_latest_block_number = async () => {
    try {
        const latest_block = await web3.eth.getBlockNumber()
        latestBlockNumber = latest_block ? latest_block - config_CONFIRMATION_BLOCK_NUMBER : latestBlockNumber
    } catch (e) {
        throw e
    } finally {
        setTimeout(cron_get_latest_block_number, 1000)
    }
}