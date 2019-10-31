"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mutation_1 = __importDefault(require("./Mutation"));
const Query_1 = __importDefault(require("./Query"));
const Result_1 = __importDefault(require("./Result"));
const Subscription_1 = __importDefault(require("./Subscription"));
const resolvers = {
    Mutation: Mutation_1.default,
    Query: Query_1.default,
    Subscription: Subscription_1.default,
    Result: Result_1.default
};
exports.default = resolvers;
