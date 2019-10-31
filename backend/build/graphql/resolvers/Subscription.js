"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const base_1 = require("./base");
const Subscription = {
    messageAdded: {
        subscribe: () => base_1.pubsub.asyncIterator(["MESSAGE_ADDED"])
    },
    messageDeleted: {
        subscribe: () => base_1.pubsub.asyncIterator(["MESSAGE_DELETED"])
    },
    messageEdited: {
        subscribe: apollo_server_1.withFilter(() => base_1.pubsub.asyncIterator(["MESSAGE_EDITED"]), (payload, variables) => {
            if (variables.messageId) {
                return payload.messageEdited.id === variables.messageId;
            }
            return true;
        })
    }
};
exports.default = Subscription;
