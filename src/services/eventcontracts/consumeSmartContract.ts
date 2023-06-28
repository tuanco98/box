import { CurrentBlockType } from "../../models/CurrentBlock"
import { Current_Block } from "../../mongodb"
import { latestBlockNumber } from "../cron/cron.get_latest_block_number"

export class ConsumeSmartContract {
    private interval_time_out: number = 1000

    constructor(
        public params: {
            handle_func: Function
            type_current_block: CurrentBlockType
            start_block: number
            step_block: number
        }
    ) {}
    public startConsume = async () => {
        try {
            this.params.start_block = await this.getStartBlock()
            if (this.params.start_block == null) throw new Error(`Start block invalid`)
            this.intervalConsume()
        } catch (e) {
            throw e
        }
    }
    private updateCurrentConsumeBlock = async (blockNumber: number) => {
        try {
            const { type_current_block } = this.params
            await Current_Block.updateOne({ type: type_current_block }, { $set: { block: blockNumber, lastUpdatedAt: +new Date() } }, { upsert: true })
        } catch (e) {
            throw e
        }
    }
    private getStartBlock = async () => {
        try {
            const { type_current_block, start_block } = this.params
            const getCurrentBlock = await Current_Block.findOne({ type: type_current_block })
            return getCurrentBlock ? getCurrentBlock.block : start_block
        } catch (e) {
            throw e
        }
    }
    private getPastEventOptions = (latest_block: number) => {
        const currentBlockWithStepBlock = this.params.start_block + this.params.step_block
        let toBlock = currentBlockWithStepBlock >= latest_block ? latest_block - 1 : currentBlockWithStepBlock
        return { fromBlock: this.params.start_block, toBlock }
    }
    private intervalConsume = async () => {
        try {
            const latest_block = latestBlockNumber
            if (latest_block < 0) throw new Error(`Latest blockNumber invalid`)
            if (this.params.start_block >= latest_block) {
                this.params.start_block = latest_block
                return
            }
            let options = this.getPastEventOptions(latest_block)
            console.log(options)
            await this.params.handle_func(options)
            this.params.start_block = options.toBlock + 1
            await this.updateCurrentConsumeBlock(this.params.start_block)
        } catch (e) {
            throw e
        } finally {
            setTimeout(this.intervalConsume, this.interval_time_out)
        }
    }
}
