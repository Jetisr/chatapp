import gql from "graphql-tag";
import { MessageListMessageFragment } from "./fragments";

export const ME = gql`
  query me {
    me {
      email
      firstName
      id
      lastName
      username
      messages {
        id
        user {
          id
        }
      }
    }
  }
`;

export const ALL_MESSAGES = gql`
  query allMessages {
    allMessages {
      ...MessageListMessage
    }
  }

  ${MessageListMessageFragment}
`;

export const MESSAGE = gql`
  query message($messageId: ID!) {
    message(messageId: $messageId) {
      id
      messageText
      user {
        firstName
        lastName
        username
        email
        id
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;
