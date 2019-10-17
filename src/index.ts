import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import { createConnection } from "typeorm";
import UserAPI from "./datasources/user";
import User from "./entities/user";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { JWT_SECRET } from "./utilities/config";
import MessageAPI from "./datasources/message";

createConnection().then(connection => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      userAPI: new UserAPI(),
      messageAPI: new MessageAPI()
    }),
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await connection
          .getRepository(User)
          .findOne({ id: decodedToken.toString() });
        return { currentUser };
      }
    }
  });

  server.listen().then(({ url }) => {
    console.log(`Apollo running on ${url}`);
  });
});
