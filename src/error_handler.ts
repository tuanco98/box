import { config_NODE_ENV, config_SERVER_CODE } from "./config"


const ServerCode = config_SERVER_CODE

export const ErrMsg = (msg: string) => {
    return new Error(`${ServerCode}: ${msg}`)
}
export const validateMissing = (object: any) => {
    let arr = Object.keys(object)
    for (let el of arr) {
        if (object[el] === null || object[el] === undefined || object[el] === "") throw ErrMsg(ERROR_CODE.MISSING_PARAM)
    }
}
export const validatePageParam = (param: { page: number; pageSize: number }) => {
    const { page, pageSize } = param
    if (page < 0) throw ErrMsg(ERROR_CODE.INVALID_PAGE)
    if (pageSize <= 0 || pageSize >= 1000) throw ErrMsg(ERROR_CODE.INVALID_PAGESIZE)
}
export const ErrCodeMessage = {
    BM2000: "Action fail because unexpected error",
}
export function ErrorHandler(e: any, args: any, funcName?: string) {
    const { message } = e
    const { password, ...params } = args
    if (message.startsWith(`${ServerCode}:`)) {
        throw new Error(message)
    } else if (config_NODE_ENV === 'dev') {
        const errCode = message.substring(0, ServerCode.length) + message.substring(ServerCode.length + 1)
        console.log("\n========================================================================================\n")
        console.log("\x1b[33m%s\x1b[0m", `⚠️  WARNING : EXPECTED ERROR HAPPENED!\n`)
        console.log("Function:", funcName)
        console.log(e)
        console.log(`Argument:`, JSON.parse(JSON.stringify(params)))
        console.log(`Message:`, ErrCodeMessage[errCode] ? ErrCodeMessage[errCode] : message.substring(ServerCode.length + 1))
        console.log("\n========================================================================================")
    } else if (config_NODE_ENV === 'prod') {
        console.log("\n========================================================================================\n")
        console.log("\x1b[31m%s\x1b[0m", `🔥  🔥  🔥  DANGER : UNEXPECTED ERROR HAPPENED!\n `)
        console.log("Function:", funcName)
        console.log(e)
        console.log(`Argument:`, JSON.parse(JSON.stringify(params)))
        console.log("\n========================================================================================")
        // CaptureException(e, { args: JSON.parse(JSON.stringify(args)) })
        // throw ErrMsg(ERROR_CODE.UNEXPECTED_ERROR)
    }
}
export const ERROR_CODE = {
    //==========UNEXPECTED ERROR==========
    UNEXPECTED_ERROR: "UNEXPECTED_ERROR",
    //==========AUTH==============
    //==========SYSTEM==========
    MISSING_PARAM: "MISSING_PARAM",
    INVALID_PAGE: "INVALID_PAGE",
    INVALID_PAGESIZE: "INVALID_PAGESIZE",
    INVALID_NFT_TYPE: "INVALID_NFT_TYPE",
    INVALID_PACK_ID: "INVALID_PACK_ID",
    //==========ADMIN==========
    //==========BLOCKCHAIN==========
    USER_HAS_CLAIMED: "USER_HAS_CLAIMED",
    USER_NOT_ON_THE_REWARD: "USER_NOT_ON_THE_REWARD",
    EVENT_NOT_START: "EVENT_NOT_START",
    EVENT_HAS_ENDED: "EVENT_HAS_ENDED",
    ROLE_MISSING: "ROLE_MISSING",
}
