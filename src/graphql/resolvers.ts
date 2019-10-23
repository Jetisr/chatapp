import { PubSub } from "apollo-server";
import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubscriptionResolvers,
  ResultResolvers
} from "../typescript/codegen";
import { Context } from "../typescript/interfaces";

const pubsub = new PubSub();

const Mutation: MutationResolvers<Context> = {
  createUser: async (root, args, { dataSources }) => {
    try {
      const user = await dataSources.userAPI.createUser(args);
      return {
        success: true,
        user
      };
    } catch (e) {
      let { message }: { message: string } = e;
      if (e.message.includes("UNIQUE constraint failed")) {
        const regex = new RegExp(/user\.(.+)$/);
        const regexResult = regex.exec(e.message);
        const match = (regexResult && regexResult[1]) || "";
        switch (match) {
          case "username":
            message = "Username must be unique";
            break;
          case "email":
            message = "Email must be unique";
            break;
          default:
            message = e.message;
            break;
        }
      }

      return {
        success: false,
        message
      };
    }
  },
  login: async (root, args, { dataSources }) => {
    if (!args.login) {
      return {
        success: false,
        message: "Must provide a username or password"
      };
    }
    try {
      const token = await dataSources.userAPI.login(args);
      return { success: true, token };
    } catch (e) {
      if (e.name === "EntityNotFound") {
        return {
          success: false,
          message: "User does not exist"
        };
      }
      return { success: false, message: e.message };
    }
  },
  sendMessage: async (root, args, { dataSources, currentUser }) => {
    if (!currentUser) {
      return {
        success: true,
        message: "Valid authorization header must be sent with request"
      };
    }

    try {
      const message = await dataSources.messageAPI.sendMessage(args);
      pubsub.publish("MESSAGE_ADDED", { messageAdded: message });
      return {
        success: true,
        sentMessage: message
      };
    } catch ({ message }) {
      return {
        success: false,
        message
      };
    }
  },
  deleteMessage: async (root, { messageId }, { dataSources }) => {
    try {
      await dataSources.messageAPI.deleteMessage(messageId);
      return { success: true };
    } catch (e) {
      if (e.name === "EntityNotFound") {
        return {
          success: false,
          message: "Message does not exist"
        };
      }
      return { success: false, message: e.message };
    }
  },
  editMessage: async (
    root,
    { messageId, updatedText },
    { dataSources, currentUser }
  ) => {
    if (!currentUser) {
      return {
        success: false,
        message: "Valid authorization header must be sent with request"
      };
    }
    try {
      const editedMessage = await dataSources.messageAPI.editMessage(
        messageId,
        updatedText
      );
      return { success: true, editedMessage };
    } catch (e) {
      if (e.name === "EntityNotFound") {
        return {
          success: false,
          message: "Message does not exist"
        };
      }

      return { success: false, message: e.message };
    }
  }
};

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

const Subscription: SubscriptionResolvers = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_ADDED"])
  }
};

const Result: ResultResolvers = {
  __resolveType: (root, args) => {
    if ("user" in root) {
      return "CreateUserResult";
    }

    if ("token" in root) {
      return "LoginResult";
    }

    if ("sentMessage" in root) {
      return "SendMessageResult";
    }

    if ("editedMessage" in root) {
      return "EditMessageResult";
    }

    return "DeleteMessageResult";
  }
};

const resolvers: Resolvers<Context> = {
  Mutation,
  Query,
  Subscription,
  Result
};

export default resolvers;
