import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getRepository, Repository } from "typeorm";
import Message from "../entities/message";
import {
  MessageDeleteError,
  MessageSendError,
  MessageEditError
} from "../errors";
import {
  MutationSendMessageArgs,
  QueryAllMessagesArgs
} from "../typescript/codegen";
import { BaseContext } from "../typescript/interfaces";

class MessageAPI extends DataSource {
  private repository: Repository<Message>;

  private context: BaseContext;

  constructor() {
    super();
    this.repository = getRepository(Message);
  }

  initialize(config: DataSourceConfig<BaseContext>) {
    this.context = config.context;
  }

  async sendMessage({
    messageText
  }: MutationSendMessageArgs): Promise<Message> {
    if (!this.context.currentUser) {
      throw new MessageSendError("No logged in user");
    }
    const message = new Message();
    message.messageText = messageText;
    message.user = this.context.currentUser;
    return this.repository.save(message);
  }

  async allMessages(args: QueryAllMessagesArgs): Promise<Message[]> {
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

  async findMessage(messageId: string): Promise<Message> {
    return this.repository.findOneOrFail(messageId, { relations: ["user"] });
  }

  async deleteMessage(messageId: string): Promise<void> {
    const messageToDelete = await this.repository.findOneOrFail(messageId, {
      relations: ["user"]
    });

    if (
      this.context.currentUser &&
      this.context.currentUser.id === messageToDelete.user.id
    ) {
      await this.repository.remove(messageToDelete);
    } else {
      throw new MessageDeleteError(
        "User is not allowed to delete this message"
      );
    }
  }

  async editMessage(
    messageId: string,
    updatedMessageText: string
  ): Promise<Message> {
    const messageToEdit = await this.repository.findOneOrFail(messageId, {
      relations: ["user"]
    });
    if (
      this.context.currentUser &&
      this.context.currentUser.id === messageToEdit.user.id
    ) {
      messageToEdit.messageText = updatedMessageText;
      return this.repository.save(messageToEdit);
    }

    throw new MessageEditError("User is not allowed to edit this message");
  }
}

export default MessageAPI;
