import { Resolvers } from "../../typescript/codegen";
import { Context } from "../../typescript/interfaces";
import Mutation from "./Mutation";
import Query from "./Query";
import Result from "./Result";
import Subscription from "./Subscription";

const resolvers: Resolvers<Context> = {
  Mutation,
  Query,
  Subscription,
  Result
};

export default resolvers;
