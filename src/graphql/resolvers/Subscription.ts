import { SubscriptionResolvers } from "../../typescript/codegen";
import { pubsub } from "./base";

const Subscription: SubscriptionResolvers = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_ADDED"])
  },
  messageDeleted: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_DELETED"])
  },
  messageEdited: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_EDITED"])
  }
};

export default Subscription;
