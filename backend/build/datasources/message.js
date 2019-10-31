"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = require("apollo-datasource");
const typeorm_1 = require("typeorm");
const message_1 = __importDefault(require("../entities/message"));
const errors_1 = require("../errors");
class MessageAPI extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.repository = typeorm_1.getRepository(message_1.default);
    }
    initialize(config) {
        this.context = config.context;
    }
    async sendMessage({ messageText }) {
        if (!this.context.currentUser) {
            throw new errors_1.MessageSendError("No logged in user");
        }
        const message = new message_1.default();
        message.messageText = messageText;
        message.user = this.context.currentUser;
        return this.repository.save(message);
    }
    async allMessages(args) {
        if (args.username || args.email) {
            return this.repository
                .createQueryBuilder("message")
                .leftJoinAndSelect("message.user", "user")
                .where("user.username = :username", { username: args.username })
                .orWhere("user.email = :email", { email: args.email })
                .getMany();
        }
        return this.repository.find({ relations: ["user"] });
    }
    async findMessage(messageId) {
        return this.repository.findOneOrFail(messageId, { relations: ["user"] });
    }
    async deleteMessage(messageId) {
        const messageToDelete = await this.repository.findOneOrFail(messageId, {
            relations: ["user"]
        });
        if (this.context.currentUser &&
            this.context.currentUser.id === messageToDelete.user.id) {
            await this.repository.remove(messageToDelete);
        }
        else {
            throw new errors_1.MessageDeleteError("User is not allowed to delete this message");
        }
    }
    async editMessage(messageId, updatedMessageText) {
        const messageToEdit = await this.repository.findOneOrFail(messageId, {
            relations: ["user"]
        });
        if (this.context.currentUser &&
            this.context.currentUser.id === messageToEdit.user.id) {
            messageToEdit.messageText = updatedMessageText;
            return this.repository.save(messageToEdit);
        }
        throw new errors_1.MessageEditError("User is not allowed to edit this message");
    }
}
exports.default = MessageAPI;
