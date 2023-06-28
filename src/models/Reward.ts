import { IndexDescription, ObjectId } from "mongodb";
import { NftType, TransactionError } from "./Common";

export interface UnboxResult {
    box_name: string
    n1: number
    n1_rune: string
    n2: number
    n2_rune: string
    n3: number
    n3_rune: string
}
export interface Reward {
    _id?: ObjectId
    tokenId: number
    typeBox?: number
    nftType: NftType
    isReward: boolean
    unboxedAt: number
    unboxResults: UnboxResult
    bot_index: number
    txid?: string
    rewardAt?: number
    blockNumber?: number
    reward_to_owner?: string
    error?: TransactionError
}
export const RewardIndexes: IndexDescription[] = [
    { key: { tokenId: 1 }, unique: true, background: true },
    { key: { typeBox: 1 },background: true },
    { key: { unboxedAt: 1 }, background: true},
    { key: { isReward: 1 }, background: true},
    { key: { bot_index: 1 }, background: true},
    { key: { txid: 1 }, background: true},
    { key: { rewardAt: 1 }, background: true},
    { key: { unboxResults: 1 }, background: true},
    { key: { isReward: 1, bot_index: 1, error: 1 }, background: true},
]