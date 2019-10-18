import { gql } from "apollo-server";

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
    me: User
  }

  type Token {
    token: String
  }

  union ResultData = User | Token | Message

  type Result {
    success: Boolean!
    message: String
    data: ResultData
  }

  type Mutation {
    createUser(
      userName: String!
      password: String!
      email: String!
      firstName: String
      lastName: String
    ): Result!
    login(username: String, email: String, password: String!): Result!
    sendMessage(messageText: String!): Result!
  }
`;

export default typeDefs;
