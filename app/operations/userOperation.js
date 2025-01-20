import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($login: LoginInput) {
    login(login: $login) {
      accessToken
      userId
      username
    }
  }
`;

export const REGISTER = gql`
  mutation Mutation($newUser: UserInput) {
    register(newUser: $newUser) {
      _id
      email
      name
      username
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      email
      name
      username
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUsers($getUserId: ID) {
    getUser(id: $getUserId) {
      _id
      email
      name
      username
    }
  }
`;

export const SEARCH_USER = gql`
  query GetUsers($search: String) {
    searchUser(search: $search) {
      _id
      email
      name
      username
    }
  }
`;
