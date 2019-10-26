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

  type EditMessageResult implements Result {
    success: Boolean!
    message: String
    editedMessage: Message
  }

  type AddAvatarResult implements Result {
    success: Boolean!
    message: String
    imageLocation: String
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
    allMessages(
      """
      Filter by email
      """
      email: String
      """
      Filter by username
      """
      username: String
    ): [Message!]!
    message(messageId: ID!): Message
  }

  type Token {
    token: String
  }

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
    editMessage(messageId: ID!, updatedText: String!): Result!
    addAvatar(avatar: Upload!): Result!
  }

  type Subscription {
    messageAdded: Message!
    messageDeleted: ID!
    messageEdited: Message!
  }
`;

export default typeDefs;
