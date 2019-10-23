import { gql } from "apollo-server";

const typeDefs = gql`
  interface Result {
    success: Boolean!
    message: String
  }

  type CreateUserResult implements Result {
    success: Boolean!
    message: String
    user: User
  }

  type LoginResult implements Result {
    success: Boolean!
    message: String
    token: String
  }

  type SendMessageResult implements Result {
    success: Boolean!
    message: String
    sentMessage: Message
  }

  type DeleteMessageResult implements Result {
    success: Boolean!
    message: String
  }
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
    allMessages: [Message!]!
    message(messageId: ID!): Message
  }

  type Token {
    token: String
  }

  # union ResultData = User | Token | Message

  # type Result {
  #   success: Boolean!
  #   message: String
  #   data: ResultData
  # }

  type Mutation {
    createUser(
      userName: String!
      password: String!
      email: String!
      firstName: String
      lastName: String
    ): Result!
    login(login: String!, password: String!): Result!
    sendMessage(messageText: String!): Result!
    deleteMessage(messageId: ID!): Result!
  }

  type Subscription {
    messageAdded: Message!
  }
`;

export default typeDefs;
