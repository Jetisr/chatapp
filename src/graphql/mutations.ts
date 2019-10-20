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
