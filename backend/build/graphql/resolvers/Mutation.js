"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const mkdirp_1 = __importDefault(require("mkdirp"));
const sharp_1 = __importDefault(require("sharp"));
const base_1 = require("./base");
const Mutation = {
    createUser: async (root, args, { dataSources }) => {
        try {
            const user = await dataSources.userAPI.createUser(args);
            return {
                success: true,
                user
            };
        }
        catch (e) {
            let { message } = e;
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
        }
        catch (e) {
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
            base_1.pubsub.publish("MESSAGE_ADDED", { messageAdded: message });
            return {
                success: true,
                sentMessage: message
            };
        }
        catch ({ message }) {
            return {
                success: false,
                message
            };
        }
    },
    deleteMessage: async (root, { messageId }, { dataSources }) => {
        try {
            await dataSources.messageAPI.deleteMessage(messageId);
            base_1.pubsub.publish("MESSAGE_DELETED", { messageDeleted: messageId });
            return { success: true };
        }
        catch (e) {
            if (e.name === "EntityNotFound") {
                return {
                    success: false,
                    message: "Message does not exist"
                };
            }
            return { success: false, message: e.message };
        }
    },
    editMessage: async (root, { messageId, updatedText }, { dataSources, currentUser }) => {
        if (!currentUser) {
            return {
                success: false,
                message: "Valid authorization header must be sent with request"
            };
        }
        try {
            const editedMessage = await dataSources.messageAPI.editMessage(messageId, updatedText);
            base_1.pubsub.publish("MESSAGE_EDITED", { messageEdited: editedMessage });
            return { success: true, editedMessage };
        }
        catch (e) {
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
        mkdirp_1.default.sync(UPLOAD_DIR);
        const convertToWebp = sharp_1.default().webp();
        const { createReadStream } = await avatar;
        const fileStream = createReadStream();
        const path = `${UPLOAD_DIR}/${currentUser.id}.webp`;
        await new Promise((resolve, reject) => {
            fileStream
                .on("error", error => {
                fs_1.unlink(path, () => {
                    reject(error);
                });
            })
                .pipe(convertToWebp)
                .pipe(fs_1.createWriteStream(path))
                .on("error", reject)
                .on("finish", resolve);
        });
        return {
            success: true
        };
    }
};
exports.default = Mutation;
