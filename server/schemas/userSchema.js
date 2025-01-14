import UserModel from "../models/userModel.js";

export const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    followers: [User]
    following: [User]
  }

  type Login {
    accessToken: String
    userId: ID
    username: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID): User
    searchUser(search: String): [User]
    getUserByUsername(username: String): User
  }

  input LoginInput {
    email: String
    password: String
  }

  input UserInput {
    username: String
    email: String
    password: String
    name: String
  }

  type Mutation {
    register(newUser: UserInput): User
    login(login: LoginInput): Login
  }
`;

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await UserModel.getUsers();
    },
    getUser: async (_, args) => {
      const { id } = args;
      return await UserModel.findUserById(id);
    },
    searchUser: async (_, args) => {
      const { search } = args;
      return await UserModel.searchUser(search);
    },
    getUserByUsername: async (_, args) => {
      const { username } = args;
      return await UserModel.findUserByUsername(username);
    },
  },

  Mutation: {
    register: async (_, args) => {
      const { newUser } = args;
      return await UserModel.create(newUser);
    },
    login: async (_, args) => {
      const { login } = args;
      return await UserModel.login(login);
    },
  },
};
