import { SubscriptionResolvers } from "../../typescript/codegen";
import { pubsub } from "./base";

const Subscription: SubscriptionResolvers = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_ADDED"])
  }
};

export default Subscription;
