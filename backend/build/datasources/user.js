"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = require("apollo-datasource");
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../entities/user"));
const config_1 = require("../utilities/config");
const errors_1 = require("../errors");
class UserAPI extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.repository = typeorm_1.getRepository(user_1.default);
    }
    initialize(config) {
        this.context = config.context;
    }
    static lowercaseInput(input) {
        return (input && input.toLowerCase()) || null;
    }
    async createUser({ userName, email, password, firstName, lastName }) {
        const user = new user_1.default();
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        user.username = userName.toLowerCase();
        user.email = email.toLowerCase();
        user.passwordHash = passwordHash;
        user.messages = [];
        if (firstName)
            user.firstName = firstName;
        if (lastName)
            user.lastName = lastName;
        return this.repository.save(user);
    }
    async login({ login, password }) {
        const lowerLogin = UserAPI.lowercaseInput(login);
        const user = await this.repository.findOneOrFail({
            where: [{ username: lowerLogin }, { email: lowerLogin }]
        });
        const passwordCorrect = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!passwordCorrect) {
            throw new errors_1.LoginError("Incorrect password");
        }
        const token = jsonwebtoken_1.default.sign(user.id, config_1.JWT_SECRET);
        return token;
    }
    async findUser({ email, id, username }) {
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
exports.default = UserAPI;
