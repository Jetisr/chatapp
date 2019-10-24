import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      message
      success
      ... on LoginResult {
        token
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    createUser(
      userName: $username
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      success
      message
      ... on CreateUserResult {
        user {
          email
          firstName
          id
          lastName
          messages {
            id
            user {
              id
            }
          }
          username
        }
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($messageText: String!) {
    sendMessage(messageText: $messageText) {
      success
      message
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId) {
      success
      message
    }
  }
`;

export const EDIT_MESSAGE = gql`
  mutation editMessage($messageId: ID!, $updatedText: String!) {
    editMessage(messageId: $messageId, updatedText: $updatedText) {
      message
      success
      ... on EditMessageResult {
        editedMessage {
          id
          messageText
        }
      }
    }
  }
`;

export const ADD_AVATAR = gql`
  mutation addAvatar($avatar: Upload!) {
    addAvatar(avatar: $avatar) {
      success
    }
  }
`;
