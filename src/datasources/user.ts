import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Repository, getRepository } from "typeorm";
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

  private lowercaseInput(input: string | null | undefined): string | null {
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
    await this.repository.save(user);

    return {
      success: true,
      data: user
    };
  }

  async login({
    email,
    username,
    password
  }: MutationLoginArgs): Promise<Result> {
    if (!username && !email) {
      return { success: false, message: "Must provide a username or email" };
    }

    const lowerUsername = this.lowercaseInput(username);
    const lowerEmail = this.lowercaseInput(email);
    const user = await this.repository.findOne({
      where: [{ username: lowerUsername }, { email: lowerEmail }]
    });

    if (!user) {
      return {
        success: false,
        message: "Incorrect password or username"
      };
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return {
        success: false,
        message: "Incorrect password or username"
      };
    }
    const token = jwt.sign(user.id, JWT_SECRET);
    return {
      success: true,
      data: { token }
    };
  }

  async findUser({ email, id, username }: QueryUserArgs): Promise<User | null> {
    const lowerUsername = this.lowercaseInput(username);
    const lowerEmail = this.lowercaseInput(email);

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
