import { IResolvers } from "graphql-tools";
import User from "../entities/user";
import UserAPI from "../datasources/user";
import MessageAPI from "../datasources/message";

export interface BaseContext {
  currentUser: User | undefined;
}

export interface Context extends BaseContext {
  dataSources: {
    userAPI: UserAPI;
    messageAPI: MessageAPI;
  };
}
