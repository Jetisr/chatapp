import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Repository, getRepository } from "typeorm";
import Message from "../entities/message";
import { BaseContext } from "../typescript/interfaces";
import { MutationSendMessageArgs, Result } from "../typescript/codegen";

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

  async sendMessage({ messageText }: MutationSendMessageArgs): Promise<Result> {
    if (!this.context.currentUser) {
      return {
        success: false,
        message: "Authorization headers must be sent with request"
      };
    }

    const message = new Message();
    message.messageText = messageText;
    message.user = this.context.currentUser;
    await this.repository.save(message);

    return {
      success: true,
      data: message
    };
  }

  async allMessages(): Promise<Message[]> {
    return this.repository.find({ relations: ["user"] });
  }
}

export default MessageAPI;
