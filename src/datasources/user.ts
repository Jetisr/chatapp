import { DataSource } from "apollo-datasource";
import { Repository, getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../entities/user";
import { CreateUserResult, LoginResult } from "../typescript/interfaces";
import { JWT_SECRET } from "../utilities/config";

class UserAPI extends DataSource {
  repository: Repository<User>;

  constructor() {
    super();
    this.repository = getRepository(User);
  }

  async createUser(
    userName: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string
  ): Promise<CreateUserResult> {
    const user = new User();
    const passwordHash = await bcrypt.hash(password, 10);
    user.username = userName;
    user.email = email;
    user.passwordHash = passwordHash;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    await this.repository.save(user);

    return {
      success: true,
      user
    };
  }

  async login(
    password: string,
    username?: string,
    email?: string
  ): Promise<LoginResult> {
    if (!username && !email) {
      return { success: false, message: "Must provide a username or email" };
    }

    const user = await this.repository.findOne({
      where: [{ username }, { email }]
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

    const token = jwt.sign({ username: user.username }, JWT_SECRET);
    return {
      success: true,
      token
    };
  }

  async findUser(
    username?: string,
    email?: string,
    id?: string
  ): Promise<User | null> {
    const user = await this.repository.findOne({
      where: [{ username }, { id }, { email }]
    });

    if (user) {
      return user;
    }

    return null;
  }
}

export default UserAPI;
