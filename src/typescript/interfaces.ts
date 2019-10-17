import { IResolvers } from "graphql-tools";
import User from "../entities/user";
import UserAPI from "../datasources/user";

export interface UserQueryArgs {
  username?: string;
  email?: string;
  id?: string;
}

export interface CreateUserArgs {
  userName: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginArgs {
  password: string;
  username?: string;
  email?: string;
}

interface Result {
  success: boolean;
  message?: string;
}

export interface CreateUserResult extends Result {
  user?: User;
}

export interface LoginResult extends Result {
  token?: string;
}

export interface BaseContext {
  currentUser: User | undefined;
}

export interface Context extends BaseContext {
  dataSources: {
    userAPI: UserAPI;
  };
}

export interface Resolvers extends IResolvers {
  Query: {
    user: (
      root: undefined,
      args: UserQueryArgs,
      context: Context
    ) => Promise<User | null>;
  };
  Mutation: {
    createUser: (
      root: undefined,
      args: CreateUserArgs,
      context: Context
    ) => Promise<CreateUserResult>;
    login: (
      root: undefined,
      args: LoginArgs,
      context: Context
    ) => Promise<LoginResult>;
  };
}
