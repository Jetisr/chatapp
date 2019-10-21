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
