import gql from "graphql-tag";

export const MessageListMessageFragment = gql`
  fragment MessageListMessage on Message {
    id
    messageText
    user {
      id
      username
    }
  }
`;
