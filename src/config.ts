import { config } from "dotenv"

config()
export let enable_bot: boolean = true
export const enableBot = (enable: boolean) => {
    enable_bot = enable
}

// SERVER CONFIG
if (!process.env.PORT) throw new Error('PORT must be provided')
export const config_PORT = process.env.PORT
if (!process.env.SERVER_CODE) throw new Error('SERVER_CODE must be provided')
export const config_SERVER_CODE = process.env.SERVER_CODE
if (!process.env.SERVER_CODE_REDIS) throw new Error('SERVER_CODE_REDIS must be provided')
export const config_SERVER_CODE_REDIS = process.env.SERVER_CODE_REDIS
if (!process.env.VISABLE_PLAYGROUND) throw new Error('VISABLE_PLAYGROUND must be provided')
export const config_VISABLE_PLAYGROUND = JSON.parse(process.env.VISABLE_PLAYGROUND)

// MONGO CONFIG
if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be provided')
export const config_MONGO_URI = process.env.MONGO_URI

// CONSUME EVENT CONFIG
if (!process.env.START_BLOCK_BOX) throw new Error('START_BLOCK_BOX must be provided')
export const config_START_BLOCK_BOX = Number(process.env.START_BLOCK_BOX)
if (!process.env.STEP_BLOCK_BOX) throw new Error('STEP_BLOCK_BOX must be provided')
export const config_STEP_BLOCK_BOX = Number(process.env.STEP_BLOCK_BOX)
if (!process.env.START_BLOCK_BOX_2) throw new Error('START_BLOCK_BOX_2 must be provided')
export const config_START_BLOCK_BOX_2 = Number(process.env.START_BLOCK_BOX_2)
if (!process.env.STEP_BLOCK_BOX_2) throw new Error('STEP_BLOCK_BOX_2 must be provided')
export const config_STEP_BLOCK_BOX_2 = Number(process.env.STEP_BLOCK_BOX_2)

// SENTRY CONFIG
if (!process.env.SENTRY_DNS) throw new Error(`SENTRY_DNS must be provided`)
export const config_SENTRY_DNS = process.env.SENTRY_DNS
if (!process.env.SENTRY_SERVER_NAME) throw new Error(`SENTRY_SERVER_NAME must be provided`)
export const config_SENTRY_SERVER_NAME = process.env.SENTRY_SERVER_NAME

// REDIS CONFIG
if (!process.env.REDIS_URI) throw new Error(`REDIS_URI must be provided`)
export const config_REDIS_URI = process.env.REDIS_URI
if (!process.env.NODE_ENV) throw new Error('NODE_ENV must be provided')
export const config_NODE_ENV = process.env.NODE_ENV

// SMART CONTRACT CONFIG
if (!process.env.CONTRACT_BOX_ADDRESS) throw new Error('CONTRACT_BOX_ADDRESS must be provided')
export const config_CONTRACT_BOX_ADDRESS = process.env.CONTRACT_BOX_ADDRESS
if (!process.env.CONTRACT_BOX_2_ADDRESS) throw new Error('CONTRACT_BOX_2_ADDRESS must be provided')
export const config_CONTRACT_BOX_2_ADDRESS = process.env.CONTRACT_BOX_2_ADDRESS

// WEB3 CONFIG
if (!process.env.WEB3_PROVIDER) throw new Error('WEB3_PROVIDER must be provided')
export const config_WEB3_PROVIDER = process.env.WEB3_PROVIDER
if (!process.env.CONFIRMATION_BLOCK_NUMBER) throw new Error('CONFIRMATION_BLOCK_NUMBER must be provided')
export const config_CONFIRMATION_BLOCK_NUMBER = Number(process.env.CONFIRMATION_BLOCK_NUMBER)

// BOT CONFIG
if (!process.env.BOT_BALANCE_LIMIT) throw new Error('BOT_BALANCE_LIMIT must be provided')
export const config_BOT_BALANCE_LIMIT = Number(process.env.BOT_BALANCE_LIMIT)
if (!process.env.REWARD_BOTS_PRIVATE_KEY) throw new Error('REWARD_BOTS_PRIVATE_KEY must be provided')
export const config_REWARD_BOTS_PRIVATE_KEY = process.env.REWARD_BOTS_PRIVATE_KEY

if (!process.env.ADMIN_KEY) throw new Error('ADMIN_KEY must be provided')
export const config_ADMIN_KEY = process.env.ADMIN_KEY