import { IndexDescription } from "mongodb"

export interface ScanBoxAddon {
    ownerAddress: string
    date: number
    createdAt: number
    time_key: number
    box_testnet_addons: number[]
}
export const ScanBoxAddonIndexes: IndexDescription[] = [
    { key: { ownerAddress: 1, time_key: 1 }, unique: true },
    { key: { createdAt: 1 }, background: true },
    { key: { time_key: 1 }, background: true },
    { key: { date: 1 }, background: true },
    { key: { box_testnet_addon: 1 }, background: true },
]
