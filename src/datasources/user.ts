import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Repository, getRepository, QueryFailedError } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../entities/user";
import { BaseContext } from "../typescript/interfaces";
import {
  MutationCreateUserArgs,
  MutationLoginArgs,
  QueryUserArgs,
  Result
} from "../typescript/codegen";
import { JWT_SECRET } from "../utilities/config";

class UserAPI extends DataSource {
  repository: Repository<User>;

  context: BaseContext;

  constructor() {
    super();
    this.repository = getRepository(User);
  }

  initialize(config: DataSourceConfig<BaseContext>) {
    this.context = config.context;
  }

  private static lowercaseInput(
    input: string | null | undefined
  ): string | null {
    return (input && input.toLowerCase()) || null;
  }

  async createUser({
    userName,
    email,
    password,
    firstName,
    lastName
  }: MutationCreateUserArgs): Promise<Result> {
    const user = new User();
    const passwordHash = await bcrypt.hash(password, 10);
    user.username = userName.toLowerCase();
    user.email = email.toLowerCase();
    user.passwordHash = passwordHash;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    try {
      await this.repository.save(user);
    } catch (e) {
      if (e.message.includes("UNIQUE constraint failed")) {
        const regex = new RegExp(/user\.(.+)$/);
        const regexResult = regex.exec(e.message);
        const match = (regexResult && regexResult[1]) || "";
        switch (match) {
          case "username":
            return {
              success: false,
              message: "Username must be unique"
            };
          case "email":
            return {
              success: false,
              message: "Email must be unique"
            };
          default:
            return {
              success: false,
              message: e.message
            };
        }
      }
    }

    return {
      success: true,
      data: { ...user, messages: [] }
    };
  }

  async login({ login, password }: MutationLoginArgs): Promise<Result> {
    if (!login) {
      return { success: false, message: "Must provide a login" };
    }

    const lowerLogin = UserAPI.lowercaseInput(login);
    const user = await this.repository.findOne({
      where: [{ username: lowerLogin }, { email: lowerLogin }]
    });

    if (!user) {
      return {
        success: false,
        message: "Incorrect password or login"
      };
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return {
        success: false,
        message: "Incorrect password or login"
      };
    }
    const token = jwt.sign(user.id, JWT_SECRET);
    return {
      success: true,
      data: { token }
    };
  }

  async findUser({ email, id, username }: QueryUserArgs): Promise<User | null> {
    const lowerUsername = UserAPI.lowercaseInput(username);
    const lowerEmail = UserAPI.lowercaseInput(email);

    const user = await this.repository.findOne({
      where: [{ username: lowerUsername }, { id }, { email: lowerEmail }],
      relations: ["messages"]
    });

    if (user) {
      return user;
    }

    return null;
  }
}

export default UserAPI;
