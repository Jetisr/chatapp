"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query = {
    user: (root, args, { dataSources }) => dataSources.userAPI.findUser(args),
    me: (root, args, { currentUser }) => currentUser || null,
    allMessages: async (root, args, { dataSources }) => dataSources.messageAPI.allMessages(args),
    message: async (root, args, { dataSources }) => {
        try {
            const resp = await dataSources.messageAPI.findMessage(args.messageId);
            return resp;
        }
        catch (e) {
            return null;
        }
    }
};
exports.default = Query;
