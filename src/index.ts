import { ApolloServer, gql } from "apollo-server";
import { createConnection } from "typeorm";
import { Resolvers } from "./typescript/interfaces";
import UserAPI from "./datasources/user";

createConnection().then(() => {
  const typeDefs = gql`
    type User {
      id: ID!
      username: String!
      firstName: String
      lastName: String
      email: String!
      passwordHash: String!
      messages: [Message!]!
    }

    type Message {
      id: ID!
      messageText: String!
      user: User!
    }

    type Query {
      user(username: String, email: String, id: String): User
    }

    type UserCreationResult {
      success: Boolean!
      message: String
      user: User
    }

    type LoginResult {
      success: Boolean!
      message: String
      token: String
    }

    type Mutation {
      createUser(
        userName: String!
        password: String!
        email: String!
        firstName: String
        lastName: String
      ): UserCreationResult!
      login(username: String, email: String, password: String!): LoginResult
    }
  `;

  const resolvers: Resolvers = {
    Mutation: {
      createUser: (root, args, { dataSources }) =>
        dataSources.userAPI.createUser(args),
      login: (root, args, { dataSources }) => dataSources.userAPI.login(args)
    },
    Query: {
      user: (root, args, { dataSources }) => dataSources.userAPI.findUser(args)
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ userAPI: new UserAPI() })
  });

  server.listen().then(({ url }) => {
    console.log(`Apollo running on ${url}`);
  });
});
