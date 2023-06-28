import { config_START_BLOCK_BOX, config_START_BLOCK_BOX_2, config_STEP_BLOCK_BOX, config_STEP_BLOCK_BOX_2 } from "../config";
import { CurrentBlockType } from "../models/CurrentBlock";
import { cron_handler } from "./cron";
import { getBoxEvents } from "./eventcontracts/boxes";
import { getBox2Events } from "./eventcontracts/boxes_2";
import { ConsumeSmartContract } from "./eventcontracts/consumeSmartContract";

export const services = async () => {
    const consumeContractBox = new ConsumeSmartContract({
        handle_func: getBoxEvents,
        type_current_block: CurrentBlockType.current_block_box,
        start_block: config_START_BLOCK_BOX,
        step_block: config_STEP_BLOCK_BOX,
    })
    const consumeContractBox2 = new ConsumeSmartContract({
        handle_func: getBox2Events,
        type_current_block: CurrentBlockType.current_block_box2,
        start_block: config_START_BLOCK_BOX_2,
        step_block: config_STEP_BLOCK_BOX_2,
    })
    try {
        await cron_handler()
        consumeContractBox.startConsume()
        consumeContractBox2.startConsume()
    } catch (e) {
        throw e;
    }
};
