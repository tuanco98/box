import { gql } from "apollo-server";

export const typeDefs = gql`
    type UnboxDetail {
        runeAmount: [Float]
        totalRune: Float
    }
    enum FilterBox {
        gold
        platinum
        diamond
    }
    type ScanBoxUser {
        ownerAddress: String
        date: Int
        isClaim: Boolean
        claimedAt: Float
        mintedAt: Float
        mint_txid: String
        box_testnet_claim: [Int]
        total_box_testnet: Float
    }
    type ClaimHistory {
        total: Int
        data: [ScanBoxUser]
    }
    type EnableBotResponse {
        message: String!
        enable: Boolean!
    }
    type Box {
        tokenId: Int
        ownerAddress: String
        nftType: String
        typeBox: Int
        currency: String
        buyBox_txid: String
        isBidding: Boolean
        createdAt: Float
        unbox: Boolean
        unboxAt: Float
        unboxDetails: UnboxDetail
    }
    type ParamRulePublicResponse {
        message: String
        value: ParamRulePublicType
    }
    type ParamRulePublicType {
        limit_user_top: Int
        box_testnet_addons: [Int]
    }
    input ParamRulePublic {
        limit_user_top: Int!
        box_testnet_addons: [Int]!
    }
    type ScanBoxAddonPage {
        total: Float
        users: [ScanBoxAddon]
    }
    type ScanBoxAddon {
        ownerAddress: String
        date: Int
        createdAt: Float
    }
    type TransactionError {
        txid: String
        blockNumber: Float
        timestamp: Float
        status: Boolean
        message: String
    }
    type UnboxResult {
        box_name: String
        n1: Float
        n1_rune: String
        n2: Float
        n2_rune: String
        n3: Float
        n3_rune: String
    }
    type Reward {
        tokenId: Float
        typeBox: Int
        isReward: Boolean
        unboxedAt: Float
        unboxResults: UnboxResult
        bot_index: Int
        txid: String
        rewardAt: Float
        blockNumber: Float
        reward_to_owner: String
        error: TransactionError
    }
    type RetryReward {
        message:String
        modifiedCount: Float
    }
    type RewardErrorPage{
        total: Float
        errors: [Reward]
    }
    type Query {
        pr_box_detail_get(tokenId: Int): Box
        pr_box_verify_fairness_get(address: String!, buybox_blockHash: String, unbox_blockHash: String!, boxId: Int!, typeBox: FilterBox!): UnboxDetail
        pr_box_bot_reward_to_user_error_get(page: Int! pageSize:Int! tokenId: Int): RewardErrorPage
        pr_box_version_api_get: String
    }
    type Mutation {
        pr_box_admin_enable_bot(admin_key: String!, enable: Boolean!): EnableBotResponse
        pr_box_admin_retry_reward_error(admin_key: String! tokenIds: [Float]): RetryReward
    }
`;
