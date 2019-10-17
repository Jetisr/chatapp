import { Resolvers } from "../typescript/interfaces";

const resolvers: Resolvers = {
  Mutation: {
    createUser: (root, args, { dataSources }) =>
      dataSources.userAPI.createUser(args),
    login: (root, args, { dataSources }) => dataSources.userAPI.login(args)
  },
  Query: {
    user: (root, args, { dataSources }) => dataSources.userAPI.findUser(args)
  }
};

export default resolvers;
