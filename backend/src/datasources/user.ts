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
import { LoginError } from "../errors";

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
  }: MutationCreateUserArgs): Promise<User> {
    const user = new User();
    const passwordHash = await bcrypt.hash(password, 10);
    user.username = userName.toLowerCase();
    user.email = email.toLowerCase();
    user.passwordHash = passwordHash;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    return this.repository.save(user);
  }

  async login({ login, password }: MutationLoginArgs): Promise<string> {
    const lowerLogin = UserAPI.lowercaseInput(login);
    const user = await this.repository.findOneOrFail({
      where: [{ username: lowerLogin }, { email: lowerLogin }]
    });

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      throw new LoginError("Incorrect password");
    }
    const token = jwt.sign(user.id, JWT_SECRET);
    return token;
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
