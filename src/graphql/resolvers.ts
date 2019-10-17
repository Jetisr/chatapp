import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  ResultData,
  ResultDataResolvers
} from "../typescript/codegen";
import { Context } from "../typescript/interfaces";

const Mutation: MutationResolvers<Context> = {
  createUser: (root, args, { dataSources }) =>
    dataSources.userAPI.createUser(args),
  login: (root, args, { dataSources }) => dataSources.userAPI.login(args)
};

const Query: QueryResolvers<Context> = {
  user: (root, args, { dataSources }) => dataSources.userAPI.findUser(args)
};

const ResultData: ResultDataResolvers = {
  __resolveType: root => {
    if ("username" in root) {
      return "User";
    }

    return "Token";
  }
};

const resolvers: Resolvers<Context> = {
  Mutation,
  Query,
  ResultData
};

export default resolvers;
