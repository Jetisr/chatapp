import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Repository, getRepository } from "typeorm";
import Message from "../entities/message";
import { BaseContext } from "../typescript/interfaces";
import { MutationSendMessageArgs, Result } from "../typescript/codegen";
import { MessageSendError, MessageDeleteError } from "../errors";

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

  async allMessages(): Promise<Message[]> {
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
}

export default MessageAPI;
