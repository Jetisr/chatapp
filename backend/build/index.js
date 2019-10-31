"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./datasources/user"));
const user_2 = __importDefault(require("./entities/user"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const config_1 = require("./utilities/config");
const message_1 = __importDefault(require("./datasources/message"));
typeorm_1.createConnection().then(connection => {
    const app = express_1.default();
    const port = process.env.PORT || 4000;
    app.use(express_1.default.static("public"));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        dataSources: () => ({
            userAPI: new user_1.default(),
            messageAPI: new message_1.default()
        }),
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null;
            try {
                if (auth && auth.toLowerCase().startsWith("bearer ")) {
                    const decodedToken = jsonwebtoken_1.default.verify(auth.substring(7), config_1.JWT_SECRET);
                    const currentUser = await connection
                        .getRepository(user_2.default)
                        .findOne({ id: decodedToken.toString() }, { relations: ["messages", "messages.user"] });
                    return { currentUser };
                }
            }
            catch (e) {
                return { currentUser: null };
            }
        }
    });
    server.applyMiddleware({ app, path: "/graphql" });
    const httpServer = http_1.default.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen({ port }, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
    });
});
