import { config_ADMIN_KEY } from "../../../config"
import { ErrMsg, ERROR_CODE, validateMissing } from "../../../error_handler"
import { mongo, Rewards } from "../../../mongodb"

export const pr_box_admin_retry_reward_error = async (root: any, args: any) => {
    const session = mongo.startSession()
    try {
        const { admin_key, tokenIds } = args as { admin_key: string; tokenIds: number[] }

        validateMissing({ admin_key })

        const admin_keys = config_ADMIN_KEY.split(",")
        const is_role = admin_keys.includes(admin_key)
        if (!is_role) throw ErrMsg(ERROR_CODE.ROLE_MISSING)
        const findOptions = { error: { $exists: true } }

        if (tokenIds && tokenIds.length > 0) {
            findOptions["tokenId"] = { $in: tokenIds }
        }
        let update: any
        await session.withTransaction(async () => {
            update = await Rewards.updateMany(
                findOptions,
                {
                    $unset: {
                        error: "",
                    },
                },
                { session }
            )
        })
        return {
            message:'Success',
            modifiedCount: update.modifiedCount
        }
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
