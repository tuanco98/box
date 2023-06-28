import Web3 from "web3"
import { Contract } from "web3-eth-contract"
import {
    config_CONTRACT_BOX_2_ADDRESS,
    config_CONTRACT_BOX_ADDRESS,
    config_REWARD_BOTS_PRIVATE_KEY,
} from "./config"
import { Box2_ABI } from "./abi_contracts/box_2"
import { successConsoleLog } from "./color-log"
import { Box_ABI } from "./abi_contracts/box"
import { Rune_Proxy_ABI } from "./abi_contracts/rune_proxy"

export let web3: Web3
export let boxContract: Contract
export let boxContract_2: Contract
export let runeProxyContract: Contract
export let account_reward_bots: string[] = []
export let account_mint_bot: string

export const connectWeb3 = async (provider: string) => {
    try {
        web3 = new Web3(provider)

        //init smart contract
        boxContract = new web3.eth.Contract(Box_ABI, config_CONTRACT_BOX_ADDRESS)
        boxContract_2 = new web3.eth.Contract(Box2_ABI, config_CONTRACT_BOX_2_ADDRESS)
        const wallet = web3.eth.accounts.wallet
        const account = web3.eth.accounts
        const bots = config_REWARD_BOTS_PRIVATE_KEY.split(',')
        bots.forEach(el => {
            wallet.add(el)
            account_reward_bots.push(account.privateKeyToAccount(el).address)
        })
        console.log({account_reward_bots})
        successConsoleLog(`🚀 Web3: connected`)
    } catch (e) {
        throw e
    }
}
