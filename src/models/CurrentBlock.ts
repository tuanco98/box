import { IndexDescription } from "mongodb";

export enum CurrentBlockType {
    current_block_box = `current_block_box`,
    current_block_box2 = `current_block_box2`,
}
export interface CurrentBlock {
    type: CurrentBlockType
    block: number
}
export const CurrentBlockIndexes: IndexDescription[] = [
    { key: { type: 1 }, background: true },
]