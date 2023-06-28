import { config_ADMIN_KEY, enableBot } from "../../../config"
import { ErrMsg, ERROR_CODE, validateMissing } from "../../../error_handler"

export const pr_box_admin_enable_bot = async (root: any, args: any, ctx: any) => {
    try {
        const { admin_key, enable } = args as { admin_key: string, enable: boolean }

        validateMissing({admin_key, enable })

        const admin_keys = config_ADMIN_KEY.split(',')
        const is_role = admin_keys.includes(admin_key)
        console.log({admin_key, enable})
        if (!is_role) throw ErrMsg(ERROR_CODE.ROLE_MISSING)
        enableBot(enable)
        return {
            message: 'success',
            enable,
        }
    } catch (e) {
        throw e
    }
}