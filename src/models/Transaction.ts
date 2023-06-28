export interface Transaction {
    txid: string
    address_contract: string
    blockNumber: number
    blockHash: string
    from: string
    to: string
    event_name: string
    time_key: number
}