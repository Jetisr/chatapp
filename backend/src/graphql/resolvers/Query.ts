import { QueryResolvers } from "../../typescript/codegen";
import { Context } from "../../typescript/interfaces";

const Query: QueryResolvers<Context> = {
  user: (root, args, { dataSources }) => dataSources.userAPI.findUser(args),
  me: (root, args, { currentUser }) => currentUser || null,
  allMessages: async (root, args, { dataSources }) =>
    dataSources.messageAPI.allMessages(args),
  message: async (root, args, { dataSources }) => {
    try {
      const resp = await dataSources.messageAPI.findMessage(args.messageId);
      return resp;
    } catch (e) {
      return null;
    }
  }
};

export default Query;
