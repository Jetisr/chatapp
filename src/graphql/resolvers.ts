import {
  Resolvers,
  MutationResolvers,
  QueryResolvers
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

const resolvers: Resolvers<Context> = {
  Mutation,
  Query
};

export default resolvers;
