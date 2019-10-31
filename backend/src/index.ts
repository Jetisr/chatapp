import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { createConnection } from "typeorm";
import UserAPI from "./datasources/user";
import User from "./entities/user";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { JWT_SECRET } from "./utilities/config";
import MessageAPI from "./datasources/message";

createConnection().then(connection => {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(express.static("public"));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      userAPI: new UserAPI(),
      messageAPI: new MessageAPI()
    }),
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      try {
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
          const currentUser = await connection
            .getRepository(User)
            .findOne(
              { id: decodedToken.toString() },
              { relations: ["messages", "messages.user"] }
            );
          return { currentUser };
        }
      } catch (e) {
        return { currentUser: null };
      }
    }
  });

  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
    );
  });
});
