import gql from "graphql-tag";

export const SUBSCRIBE_TO_NEW_MESSAGES = gql`
  subscription newMessages {
    messageAdded {
      id
      messageText
      user {
        id
        username
        email
        firstName
        lastName
      }
    }
  }
`;

export const SUBSCRIBE_TO_DELETIONS = gql`
  subscription deleteMessages {
    messageDeleted
  }
`;

export const SUBSCRIBE_TO_EDITS = gql`
  subscription editsToMessage {
    messageEdited {
      id
      messageText
    }
  }
`;
