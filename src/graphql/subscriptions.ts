import gql from "graphql-tag";

export const SUBSCRIBE_TO_NEW_MESSAGES = gql`
  subscription newMessages {
    messageAdded {
      id
      messageText
      user {
        id
        username
      }
    }
  }
`;
