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

export default typeDefs;
