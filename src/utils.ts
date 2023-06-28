import BN from "bn.js"
import { config_BOT_BALANCE_LIMIT } from "./config"
import { UnboxResult } from "./models/Reward"

export const is_latest_greater_three_block = (block_check: number, latest_block: number): boolean => {
    return latest_block - block_check >= 3
}
export const mili_timestamp = (seconds: string | number) => {
    if (seconds.toString().length >= 13) return Number(seconds)
    return Number(seconds) * 1000
}
export const isBalanceGreaterThanLimit = (balance: string): boolean => {
    const limit = config_BOT_BALANCE_LIMIT.toString()
    return new BN(balance).gt(new BN(limit))
}
const items: string[] = [
    "Soil",
    "Stone",
    "Wood",
    "Rubber",
    "Plastic",
    "Crystal",
    "Metal",
    "Gem",
    "Onixius",
    "Crypton",
    "Pythium",
    "Paranium",
]

export const convertReward = (unbox_result: UnboxResult) => {
    let runeAmount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let totalRune = 0

    for (let i = 1; i <= 3; i++) {
        const index = items.indexOf(unbox_result[`n${i}_rune`])

        runeAmount[index] += unbox_result[`n${i}`]

        totalRune += unbox_result[`n${i}`]
    }

    return { totalRune, runeAmount }
}
export function getBoxType(input: string) {
    try {
        switch (input) {
            case `gold`:
                return 0
            case `platinum`:
                return 1
            case `diamond`:
                return 2
            default:
                throw new Error(`boxType is invalid`)
        }
    } catch (e) {
        throw e
    }
}
import fs from "fs"
const csv = require("csv-parser")
let results: any[] = []
export const readCSV = async (path: string) => {
    try {
        results = []
        const result: any[] = await new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv())
                .on("data", (data) => results.push(data))
                .on("end", () => {
                    resolve(results)
                })
        })
        return result
    } catch (e) {
        throw e
    }
}
