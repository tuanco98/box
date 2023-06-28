import { ErrMsg, ERROR_CODE, validateMissing } from "../../../error_handler"
import { Boxes, Rewards } from "../../../mongodb"
import { convertReward } from "../../../utils"


export const pr_box_detail_get = async (root: any, args: any, ctx: any) => {
    try {
        const { tokenId } = args as { tokenId: number }

        validateMissing({ tokenId })

        if (tokenId < 0) throw ErrMsg(ERROR_CODE.INVALID_PACK_ID)

        const box = await Boxes.findOne({ tokenId })

        const getBoxResult = await Rewards.findOne({tokenId})

        const unboxDetails = getBoxResult? convertReward(getBoxResult?.unboxResults) : null

        return {...box, unboxDetails}
    } catch (e) {
        throw e
    }
}
