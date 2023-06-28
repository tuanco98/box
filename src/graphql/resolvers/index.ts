import { pr_box_verify_fairness_get } from "./Queries/pr_box_verify_fairness_get";
import { pr_box_detail_get } from "./Queries/pr_box_detail_get";
import { pr_box_admin_enable_bot } from "./Mutations/pr_box_admin_enable_bot";
import { pr_box_bot_reward_to_user_error_get } from "./Queries/pr_box_bot_reward_to_user_error_get";
import { pr_box_admin_retry_reward_error } from "./Mutations/pr_box_admin_retry_reward_error";
import { VERSION_API } from "../../version";

const resolvers = {
    Query: {
        pr_box_detail_get,
        pr_box_verify_fairness_get,
        pr_box_bot_reward_to_user_error_get,
        pr_box_version_api_get:() => VERSION_API,
    },
    Mutation: {
        pr_box_admin_enable_bot,
        pr_box_admin_retry_reward_error
    }
};
export { resolvers };
