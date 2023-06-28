import { config_SERVER_CODE_REDIS } from "./config"
import { ioredis } from "./redis"
import { account_reward_bots } from "./web3"

export const setHandleUnbox = async (tokenId: number, value: any) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.handle_unbox.${tokenId}`
        const result = await ioredis.set(key, JSON.stringify(value))
        return result
    } catch (e) {
        throw e
    }
}

export const getHandleUnbox = async (tokenId: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.handle_unbox.${tokenId}`
        const result = await ioredis.get(key)
        if (result) {
            return JSON.parse(result) as any
        }
        return null
    } catch (e) {
        throw e
    }
}
export const delHandleUnbox = async (tokenId: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.handle_unbox.${tokenId}`
        const result = await ioredis.del(key)
        return result
    } catch (e) {
        throw e
    }
}
export const setRewardBox = async (tokenId: number, value: any) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.reward_box.${tokenId}`
        const result = await ioredis.set(key, JSON.stringify(value))
        return result
    } catch (e) {
        throw e
    }
}

export const getRewardBox = async (tokenId: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.reward_box.${tokenId}`
        const result = await ioredis.get(key)
        if (result) {
            return JSON.parse(result) as any
        }
        return null
    } catch (e) {
        throw e
    }
}
export const delRewardBox = async (tokenId: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.reward_box.${tokenId}`
        const result = await ioredis.del(key)
        return result
    } catch (e) {
        throw e
    }
}
export const setRewardBoxData = async (tokenId: number, value: any) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.reward_box_data.${tokenId}`
        const result = await ioredis.set(key, JSON.stringify(value))
        return result
    } catch (e) {
        throw e
    }
}

export const getRewardBoxData = async (tokenId: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.reward_box_data.${tokenId}`
        const result = await ioredis.get(key)
        if (result) {
            return JSON.parse(result) as any
        }
        return null
    } catch (e) {
        throw e
    }
}
export const delRewardBoxData = async (tokenId: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.reward_box_data.${tokenId}`
        const result = await ioredis.del(key)
        return result
    } catch (e) {
        throw e
    }
}
export const setIndexBotReward = async (index: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.set_index_bot_reward.`

        const value = await getIndexBotReward()

        const newValue = value.index + index

        if (!index || newValue >= account_reward_bots.length) {
            const result = await ioredis.set(key, JSON.stringify({ index: 0 }))
            return result
        }
        const result = await ioredis.set(key, JSON.stringify({ index: newValue }))
        return result
    } catch (e) {
        throw e
    }
}
export const getIndexBotReward = async (): Promise<{ index: number }> => {
    const key = `the_parallel.${config_SERVER_CODE_REDIS}.set_index_bot_reward.`
    let result = await ioredis.get(key)
    if (!result) {
        await ioredis.set(key, JSON.stringify({ index: 0 }))
        return JSON.parse((await ioredis.get(key)) || "")
    }
    return JSON.parse(result) as { index: number }
}

export const setMintToUser = async (user_key: string, value: any) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.mint_box_testnet.${user_key}`
        const result = await ioredis.set(key, JSON.stringify(value))
        return result
    } catch (e) {
        throw e
    }
}
export const getMintToUser = async (user_key: string) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.mint_box_testnet.${user_key}`

        const result = await ioredis.get(key)
        if (result) {
            return JSON.parse(result) as any
        }
        return null
    } catch (e) {
        throw e
    }
}
export const setParameterPublicTestnet = async (limit_user_top: number, box_testnet_addons: number[]) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.parameter_public_testnet`
        await ioredis.set(key, JSON.stringify({ limit_user_top, box_testnet_addons }))
        const result = await getParameterPublicTestnet()
        return result
    } catch (e) {
        throw e
    }
}
export const getParameterPublicTestnet = async (): Promise<{ limit_user_top: number, box_testnet_addons: number[] }> => {
    const key = `the_parallel.${config_SERVER_CODE_REDIS}.parameter_public_testnet`
    let result = await ioredis.get(key)
    if (!result) {
        await ioredis.set(key, JSON.stringify({ limit_user_top: 100, box_testnet_addons: [1, 1, 1] }))
        return JSON.parse((await ioredis.get(key)) || "")
    }
    return JSON.parse(result) as { limit_user_top: number, box_testnet_addons: number[]}
}
export const setBotRewardIndex = async (tokenId: string, index: number) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.BotRewardIndex.${tokenId}`
        const result = await ioredis.set(key, index)
        return result
    } catch (e) {
        throw e
    }
}

export const getBotRewardIndex = async (tokenId: string) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.BotRewardIndex.${tokenId}`
        const result = await ioredis.get(key)
        if (result) {
            return Number(result) as number
        }
        return null
    } catch (e) {
        throw e
    }
}
export const delBotRewardIndex = async (tokenId: string) => {
    try {
        const key = `the_parallel.${config_SERVER_CODE_REDIS}.BotRewardIndex.${tokenId}`
        const result = await ioredis.del(key)
        return result
    } catch (e) {
        throw e
    }
}
export const getMintHash = async (hash:string):Promise<string|null> => {
    const key = `the_parallel.${config_SERVER_CODE_REDIS}.mint.${hash}`
    let result = await ioredis.get(key)
    return result
}

export const setMintHash = async (hash:string):Promise<string|null> => {
    const key = `the_parallel.${config_SERVER_CODE_REDIS}.mint.${hash}`
    await ioredis.set(key, new Date().getTime())
    return "OK"
}