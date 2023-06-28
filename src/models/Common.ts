export enum RunePack {
    Soil,
    Stone,
    Wood,
    Rubber, 
    Plastic, 
    Crystal,
    Metal,
    Gem,
    Onixius, 
    Crypton,
    Pythium,
    Paranium,
}
export enum Tier {
    basic = 'basic',
    common = 'common',
    rare = 'rare',
    epic = 'epic',
    legendary = 'legendary'
}

export enum Attribute {
    fire = 'fire',
    water = 'water',
    air = 'air',
    grass = 'grass',
    earth = 'earth'
}

export interface Stats {
    health: number
    attack: number
    defend: number
    speed: number
}
export enum NftType {
    rune_pack = `rune_pack`,
    paraart = `paraart`,
    paragon = `paragon`,
    box = `box`,
}
export enum StatusMyList {
    bid = `bid`,
    bidding = `bidding`,
    success = `success`,
    refund = `refund`,
    canceled = `canceled`,
}
export enum MyBidRentStatus {
    rented = `rented`,
    unrented = `unrented`
}
export enum SortDateType {
    newest = `newest`,
    oldest = `oldest`,
}
export enum SortPriceType {
    lowest = `lowest`,
    highest = `highest`,
}
export enum FilterBoxType {
    gold = `gold`,
    platinum = `platinum`,
    diamond = `diamond`,
}
export enum EventName {
    allEvents = `allEvents`,
    // order
    OrderCreate = `OrderCreate`,
    OrderCancel = `OrderCancel`,
    OrderConfirmed = `OrderConfirmed`,
    // bid
    Bid = `Bid`,
    // rune pack
    Pack = `Pack`,
    UnPack = `UnPack`,
    // paraart
    CopyrightReserved = `CopyrightReserved`,
    CopyrightRental = `CopyrightRental`,
    // copyright rent
    SetRoyaltyFee = `SetRoyaltyFee`,
    Rent = `Rent`,
    // box
    Unbox = `Unbox`,
    MintBox = `MintBox`,
    BuyBox = `BuyBox`,
    Reward = `Reward`,

    // fusion
    Fusion = `Fusion`,
    Result = `Result`,

    Transfer = `Transfer`,
}
export enum LogBoxStatus {
    opened = `opened`,
    buy = `buy`,
}
export enum FusionStatus {
    success = `success`,
    processing = `processing`,
    failed = `failed`,
    paying = `paying`,
    paid = `paid`,
}
export interface TransactionError {
    txid: string
    blockNumber: number
    timestamp: number
    status: boolean
    message?: string
}
export const null_address = '0x0000000000000000000000000000000000000000'