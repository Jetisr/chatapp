import { createWriteStream, unlink } from "fs";
import mkdirp from "mkdirp";
import sharp from "sharp";
import { MutationResolvers } from "../../typescript/codegen";
import { Context } from "../../typescript/interfaces";
import { pubsub } from "./base";

const Mutation: MutationResolvers<Context> = {
  createUser: async (root, args, { dataSources }) => {
    try {
      const user = await dataSources.userAPI.createUser(args);
      return {
        success: true,
        user
      };
    } catch (e) {
      let {
        message
      }: {
        message: string;
      } = e;
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
  },
  addAvatar: async (root, { avatar }, { dataSources, currentUser }) => {
    if (!currentUser) {
      return {
        success: false,
        message: "Valid authorization header must be sent with request"
      };
    }
    const UPLOAD_DIR = `./src/assets/avatars`;
    mkdirp.sync(UPLOAD_DIR);
    const convertToWebp = sharp().webp();
    const { createReadStream } = await avatar;
    const fileStream = createReadStream();
    const path = `${UPLOAD_DIR}/${currentUser.id}.webp`;
    await new Promise((resolve, reject) => {
      fileStream
        .on("error", error => {
          unlink(path, () => {
            reject(error);
          });
        })
        .pipe(convertToWebp)
        .pipe(createWriteStream(path))
        .on("error", reject)
        .on("finish", resolve);
    });
    return {
      success: true
    };
  }
};

export default Mutation;
