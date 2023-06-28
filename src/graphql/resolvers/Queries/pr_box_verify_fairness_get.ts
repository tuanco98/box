import { BoxType } from "../../../models/Box"
import { OpenBox } from "../../../services/systems/unbox_result_engine"
import { convertReward, getBoxType } from "../../../utils"


interface ParamType {
    address: string
    buybox_blockHash: string
    unbox_blockHash: string
    boxId: number
    typeBox: BoxType
}
export const pr_box_verify_fairness_get = async (root: any, args: any, ctx: any) => {
    try {
        const { address, buybox_blockHash, unbox_blockHash, boxId, typeBox } = args as ParamType

        const getTypeBox = getBoxType(typeBox)

        const runeAmount = OpenBox(address, unbox_blockHash, buybox_blockHash, boxId, getTypeBox)

        const result = convertReward(runeAmount)

        return result
    } catch (e) {
        throw e
    }
}