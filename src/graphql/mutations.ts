import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      message
      success
      data {
        ... on Token {
          token
        }
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
      data {
        ... on User {
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
