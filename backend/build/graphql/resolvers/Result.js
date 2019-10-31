"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result = {
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
        if ("imageLocation" in root) {
            return "AddAvatarResult";
        }
        return "DeleteMessageResult";
    }
};
exports.default = Result;
