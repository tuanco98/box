import { account_reward_bots } from "../../web3"
import { cron_handle_unbox } from "./cron_handle_unbox"
import { cron_reward_multi_bots } from "./cron_reward_multi_bots"

export const cron_handler = async () => {
    try {
        cron_handle_unbox()
        for(let [index, address] of account_reward_bots.entries()){
            cron_reward_multi_bots(index, address)
        }
    } catch (e) {
        throw e
    }
}