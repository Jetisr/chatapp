import { PubSub } from "apollo-server";
import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  ResultDataResolvers,
  SubscriptionResolvers
} from "../typescript/codegen";
import { Context } from "../typescript/interfaces";

const pubsub = new PubSub();

const Mutation: MutationResolvers<Context> = {
  createUser: (root, args, { dataSources }) =>
    dataSources.userAPI.createUser(args),
  login: (root, args, { dataSources }) => dataSources.userAPI.login(args),
  sendMessage: async (root, args, { dataSources }) => {
    const messageResult = await dataSources.messageAPI.sendMessage(args);
    if (messageResult.success && messageResult.data) {
      pubsub.publish("MESSAGE_ADDED", { messageAdded: messageResult.data });
    }

    return messageResult;
  }
};

const Query: QueryResolvers<Context> = {
  user: (root, args, { dataSources }) => dataSources.userAPI.findUser(args),
  me: (root, args, { currentUser }) => currentUser || null,
  allMessages: (root, args, { dataSources }) =>
    dataSources.messageAPI.allMessages(),
  message: async (root, args, { dataSources }) => {
    try {
      const resp = await dataSources.messageAPI.findMessage(args.messageId);
      return resp;
    } catch (e) {
      return null;
    }
  }
};

const ResultData: ResultDataResolvers = {
  __resolveType: root => {
    if ("username" in root) {
      return "User";
    }

    if ("messageText" in root) {
      return "Message";
    }

    return "Token";
  }
};

const Subscription: SubscriptionResolvers = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_ADDED"])
  }
};

const resolvers: Resolvers<Context> = {
  Mutation,
  Query,
  Subscription,
  ResultData
};

export default resolvers;
