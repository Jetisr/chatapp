import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
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

  app.use(bodyParser.json());

  const httpServer = http.createServer(app);

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
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: 4000 }, () => {
    console.log("apollo running on http://localhost:4000/graphql");
  });
});
