import gql from "graphql-tag";

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
      id
      messageText
      user {
        id
        username
      }
    }
  }
`;
