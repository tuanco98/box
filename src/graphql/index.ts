import { ApolloServer } from "apollo-server"
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core"
import { successConsoleLog } from "../color-log"
import { config_VISABLE_PLAYGROUND, config_PORT } from "../config"
import { resolvers } from "./resolvers"
import { typeDefs } from "./typeDefs/schema"

export const initGraphQLServer = async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [
                config_VISABLE_PLAYGROUND
                    ? ApolloServerPluginLandingPageGraphQLPlayground()
                    : ApolloServerPluginLandingPageDisabled(),
            ],
            debug: true,
        })
        const { url } = await server.listen({ port: config_PORT })
        successConsoleLog(`🚀 Apollo server ready at ${url}`)
    } catch (e) {
        throw e
    }
}
