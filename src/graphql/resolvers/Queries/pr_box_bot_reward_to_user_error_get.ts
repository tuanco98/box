import { validatePageParam } from "../../../error_handler"
import { Rewards } from "../../../mongodb"

export const pr_box_bot_reward_to_user_error_get = async (root: any, args: any) => {
    try {
        const { page, pageSize, tokenId } = args as { page: number, pageSize: number, tokenId: number }
        validatePageParam({page, pageSize})
        
        const findOptions = {error: {$exists: true}}
        if (tokenId != null) {
            findOptions["tokenId"] = tokenId
        }
        const reward_errors = await Rewards.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray()
        const total = await Rewards.countDocuments(findOptions)
        return {
            total,
            errors: reward_errors
        }
    } catch (e) {}
}
